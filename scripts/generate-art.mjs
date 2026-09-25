/**
 * Generates the illustrated food artwork in /public/images.
 * Run with: npm run art
 *
 * These are stylised top-down illustrations used until real product
 * photography is available. To use photos instead, drop a .jpg/.webp into
 * /public/images/products and update the `image` path in data/products.ts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "art");
const TAU = Math.PI * 2;
const f = (n) => Math.round(n * 10) / 10;

function rngFrom(seed) {
  let a = 0;
  for (const ch of seed) a = (a * 31 + ch.charCodeAt(0)) >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Ctx {
  constructor(seed) {
    this.r = rngFrom(seed);
    this.defs = [];
    this.n = 0;
  }
  id(p) {
    return `${p}${this.n++}`;
  }
  rand(a, b) {
    return a + this.r() * (b - a);
  }
  pick(arr) {
    return arr[Math.floor(this.r() * arr.length)];
  }
  inCircle(cx, cy, r) {
    const a = this.r() * TAU;
    const d = Math.sqrt(this.r()) * r;
    return [cx + Math.cos(a) * d, cy + Math.sin(a) * d];
  }
  radial(stops, { cx = "50%", cy = "50%", r = "50%", fx, fy } = {}) {
    const id = this.id("rg");
    const s = stops.map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`).join("");
    this.defs.push(
      `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"${fx ? ` fx="${fx}" fy="${fy}"` : ""}>${s}</radialGradient>`,
    );
    return `url(#${id})`;
  }
  linear(stops, [x1, y1, x2, y2] = [0, 0, 0, 1]) {
    const id = this.id("lg");
    const s = stops.map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`).join("");
    this.defs.push(`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${s}</linearGradient>`);
    return `url(#${id})`;
  }
  clipCircle(cx, cy, r) {
    const id = this.id("cp");
    this.defs.push(`<clipPath id="${id}"><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}"/></clipPath>`);
    return `url(#${id})`;
  }
}

const baseDefs = `
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .09"/></feComponentTransfer></filter>
<filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#2b1a0e" flood-opacity=".35"/></filter>
<filter id="shs" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#2b1a0e" flood-opacity=".35"/></filter>`;

function svgDoc(w, h, ctx, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${baseDefs}${ctx.defs.join("")}</defs>${body}</svg>`;
}

/* ---------- shape helpers ---------- */

function smoothClosed(pts) {
  const n = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}

function blob(ctx, cx, cy, r, points = 6, jitter = 0.3) {
  const pts = [];
  const rot = ctx.r() * TAU;
  for (let i = 0; i < points; i++) {
    const a = rot + (i / points) * TAU;
    const rr = r * (1 - jitter / 2 + ctx.r() * jitter);
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return smoothClosed(pts);
}

function curryLeaf(ctx, x, y, len, angle) {
  const w = len * 0.36;
  const fill = ctx.pick(["#2F5D2A", "#3A6B2F", "#467A35", "#2B5424"]);
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})"><path d="M0 0C${f(w)} ${f(-len * 0.25)} ${f(w * 0.75)} ${f(-len * 0.78)} 0 ${f(-len)}C${f(-w * 0.75)} ${f(-len * 0.78)} ${f(-w)} ${f(-len * 0.25)} 0 0Z" fill="${fill}"/><path d="M0 -2L0 ${f(-len * 0.92)}" stroke="#9DBB6E" stroke-opacity=".55" stroke-width="${f(len * 0.035)}"/></g>`;
}

function sprig(ctx, x, y, len, angle, leafLen = 30) {
  let out = `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})" filter="url(#shs)">`;
  out += `<path d="M0 0Q${f(len * 0.05)} ${f(-len * 0.5)} 0 ${f(-len)}" stroke="#5B6B2E" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const pairs = Math.floor(len / (leafLen * 0.55));
  for (let i = 1; i <= pairs; i++) {
    const t = i / (pairs + 0.6);
    const py = -len * t;
    const l = leafLen * (1 - t * 0.35);
    out += curryLeaf(ctx, 0, py, l, -58 + ctx.rand(-8, 8));
    out += curryLeaf(ctx, 0, py - 4, l, 58 + ctx.rand(-8, 8));
  }
  out += curryLeaf(ctx, 0, -len, leafLen * 0.7, ctx.rand(-10, 10));
  return out + "</g>";
}

function chilli(ctx, x, y, len, angle) {
  const h = len * 0.12;
  const fill = ctx.linear([[0, "#B42A18"], [0.55, "#8C1A10"], [1, "#5E0F0A"]]);
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})" filter="url(#shs)"><path d="M0 ${f(-h)}C${f(len * 0.35)} ${f(-h * 1.25)} ${f(len * 0.8)} ${f(-h * 0.5)} ${f(len)} ${f(h * 0.6)}C${f(len * 0.78)} ${f(h * 0.4)} ${f(len * 0.35)} ${f(h * 1.15)} 0 ${f(h)}Z" fill="${fill}"/><path d="M${f(len * 0.08)} ${f(-h * 0.45)}C${f(len * 0.35)} ${f(-h * 0.7)} ${f(len * 0.6)} ${f(-h * 0.4)} ${f(len * 0.82)} 0" stroke="#E0674A" stroke-opacity=".6" stroke-width="${f(h * 0.3)}" fill="none" stroke-linecap="round"/><path d="M${f(len * 0.25)} ${f(h * 0.3)}l${f(len * 0.1)} ${f(-h * 0.5)}M${f(len * 0.5)} ${f(h * 0.2)}l${f(len * 0.08)} ${f(-h * 0.45)}" stroke="#4A0C08" stroke-opacity=".5" stroke-width="1.2" fill="none"/><path d="M0 ${f(-h * 0.8)}C${f(-len * 0.08)} ${f(-h)} ${f(-len * 0.1)} ${f(-h * 0.2)} ${f(-len * 0.18)} ${f(-h * 0.1)}L${f(-len * 0.17)} ${f(h * 0.25)}C${f(-len * 0.09)} ${f(h * 0.2)} ${f(-len * 0.06)} ${f(h)} 0 ${f(h * 0.8)}Z" fill="#5E5A22"/></g>`;
}

function cashew(ctx, x, y, s, angle) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)}) scale(${f(s)})"><path d="M0 0C4 -16 26 -18 34 -2C36 4 30 8 26 4C22 -4 12 -4 10 4C8 10 0 8 0 0Z" fill="#F0DDB0" stroke="#C49A5A" stroke-width="1.2"/><path d="M6 -2C12 -10 22 -10 28 -3" stroke="#FFF6DE" stroke-opacity=".7" stroke-width="1.5" fill="none"/></g>`;
}

function cardamom(ctx, x, y, s, angle) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})"><ellipse rx="${f(s)}" ry="${f(s * 0.55)}" fill="#A9B06A" stroke="#7C8447" stroke-width="1"/><path d="M${f(-s * 0.7)} 0H${f(s * 0.7)}M${f(-s * 0.6)} ${f(-s * 0.22)}Q0 ${f(-s * 0.35)} ${f(s * 0.6)} ${f(-s * 0.22)}" stroke="#7C8447" stroke-width=".9" fill="none"/></g>`;
}

function cinnamon(ctx, x, y, len, angle) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})" filter="url(#shs)"><rect x="0" y="-8" width="${f(len)}" height="16" rx="7" fill="#8A4F26"/><rect x="0" y="-4" width="${f(len)}" height="3" fill="#6B3A1A" opacity=".7"/><rect x="0" y="3" width="${f(len)}" height="2" fill="#B37748" opacity=".6"/><ellipse cx="${f(len)}" cy="0" rx="4" ry="8" fill="#A66A3C"/></g>`;
}

function bananaLeaf(ctx, cx, cy, L, W, angle) {
  const clip = ctx.id("bl");
  const outline = `M${f(-L / 2)} 0C${f(-L / 4)} ${f(-W * 0.66)} ${f(L / 4)} ${f(-W * 0.62)} ${f(L / 2)} 0C${f(L / 4)} ${f(W * 0.64)} ${f(-L / 4)} ${f(W * 0.66)} ${f(-L / 2)} 0Z`;
  ctx.defs.push(`<clipPath id="${clip}"><path d="${outline}"/></clipPath>`);
  const fill = ctx.linear([[0, "#335F2A"], [0.5, "#4C8538"], [1, "#2E5725"]]);
  let veins = "";
  for (let x = -L / 2 + 10; x < L / 2; x += 11) {
    veins += `M${f(x)} 0L${f(x + W * 0.28)} ${f(-W * 0.6)}M${f(x)} 0L${f(x + W * 0.28)} ${f(W * 0.6)}`;
  }
  return `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(angle)})"><path d="${outline}" fill="${fill}" filter="url(#sh)"/><g clip-path="url(#${clip})"><path d="${veins}" stroke="#23461D" stroke-opacity=".28" stroke-width="1.4"/><path d="${veins}" transform="translate(4 0)" stroke="#8DBA63" stroke-opacity=".12" stroke-width="1"/><ellipse cx="${f(-L * 0.1)}" cy="${f(-W * 0.18)}" rx="${f(L * 0.35)}" ry="${f(W * 0.16)}" fill="#fff" opacity=".07"/></g><path d="M${f(-L / 2)} 0L${f(L / 2)} 0" stroke="#B5CF7E" stroke-width="${f(W * 0.035)}" stroke-opacity=".8"/></g>`;
}

/** Top-down bowl; returns [svg, innerRadius, clipUrl]. */
function bowl(ctx, cx, cy, r, style = "clay") {
  const pal = {
    clay: ["#A24E2C", "#7A3519", "#C06C43", "#5A2410"],
    brass: ["#C8983F", "#8E6420", "#E9C477", "#6B4814"],
    wood: ["#8A5A36", "#5E3A1F", "#A87650", "#3E2512"],
    white: ["#F4EDE1", "#CFC4B2", "#FFFFFF", "#A89C88"],
  }[style];
  const inner = r * 0.86;
  const rim = ctx.radial([[0.8, pal[2]], [0.93, pal[0]], [1, pal[3]]]);
  const clip = ctx.clipCircle(cx, cy, inner);
  const svg = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${rim}" filter="url(#sh)"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r * 0.93)}" fill="none" stroke="${pal[3]}" stroke-opacity=".35" stroke-width="1.5"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(inner)}" fill="${pal[1]}"/>`;
  return [svg, inner, clip];
}

function bowlShade(ctx, cx, cy, r) {
  const g = ctx.radial([[0.62, "#000", 0], [1, "#1a0c04", 0.55]]);
  const h = ctx.radial([[0, "#fff", 0.16], [1, "#fff", 0]], { cx: "35%", cy: "30%", r: "55%" });
  return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${h}"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${g}"/>`;
}

/* ---------- foods ---------- */

const foods = {
  sambol(ctx, cx, cy, r) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#5A1C0C"/>`;
    const pal = ["#7A2A14", "#9C3B1B", "#6A220F", "#B5532A", "#843016", "#A34622"];
    for (let i = 0; i < 380; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r);
      s += `<path d="${blob(ctx, x, y, ctx.rand(4, 10), 5, 0.6)}" fill="${ctx.pick(pal)}"/>`;
    }
    for (let i = 0; i < 40; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.9);
      const a = ctx.rand(0, TAU), l = ctx.rand(8, 16);
      s += `<path d="M${f(x)} ${f(y)}q${f(Math.cos(a) * l)} ${f(Math.sin(a) * l - 5)} ${f(Math.cos(a) * l * 2)} ${f(Math.sin(a) * l * 2)}" stroke="#D99A8A" stroke-opacity=".75" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    }
    for (let i = 0; i < 70; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(ctx.rand(1, 2.4))}" fill="${ctx.pick(["#D8452A", "#E86A3A", "#3A0E06"])}"/>`;
    }
    for (let i = 0; i < 5; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.75);
      s += curryLeaf(ctx, x, y, ctx.rand(22, 32), ctx.rand(0, 360));
    }
    return s;
  },

  driedMeat(ctx, cx, cy, r) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#3A1A0D"/>`;
    for (let i = 0; i < 75; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.95);
      const w = ctx.rand(70, 120) * (r / 190), h = ctx.rand(20, 30) * (r / 190);
      const fill = ctx.pick(["#6E2A14", "#5A2110", "#823619", "#4C1B0C", "#93401E"]);
      let fibers = "";
      for (let k = 0; k < 3; k++) {
        const yy = ctx.rand(-h / 2 + 3, h / 2 - 3);
        fibers += `<path d="M${f(-w / 2 + 6)} ${f(yy)}Q0 ${f(yy + ctx.rand(-3, 3))} ${f(w / 2 - 6)} ${f(yy)}" stroke="#B8643A" stroke-opacity=".45" stroke-width="1.3" fill="none"/>`;
      }
      s += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(ctx.rand(0, 180))})" filter="url(#shs)"><rect x="${f(-w / 2)}" y="${f(-h / 2)}" width="${f(w)}" height="${f(h)}" rx="${f(h * 0.4)}" fill="${fill}" stroke="#2A0E05" stroke-opacity=".5"/>${fibers}</g>`;
    }
    for (let i = 0; i < 60; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(ctx.rand(0.8, 1.8))}" fill="${ctx.pick(["#C9542E", "#1C0A04"])}"/>`;
    }
    return s;
  },

  babath(ctx, cx, cy, r) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#6A2410"/>`;
    for (let i = 0; i < 120; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.97);
      const pr = ctx.rand(16, 26) * (r / 190);
      s += `<g filter="url(#shs)"><path d="${blob(ctx, x, y, pr, 7, 0.45)}" fill="${ctx.pick(["#B06A3A", "#9A5530", "#C07A45", "#A85F32"])}"/>`;
      for (let k = 0; k < 6; k++) {
        const [dx, dy] = ctx.inCircle(x, y, pr * 0.6);
        s += `<circle cx="${f(dx)}" cy="${f(dy)}" r="${f(pr * 0.12)}" fill="#6E2E14" opacity=".55"/>`;
      }
      s += `<path d="${blob(ctx, x, y, pr * 0.9, 6, 0.5)}" fill="#A8260F" opacity=".35"/></g>`;
    }
    for (let i = 0; i < 12; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.85);
      s += curryLeaf(ctx, x, y, ctx.rand(20, 30), ctx.rand(0, 360));
    }
    for (let i = 0; i < 80; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(ctx.rand(1, 2.2))}" fill="${ctx.pick(["#D8452A", "#2A0C05"])}"/>`;
    }
    return s;
  },

  spiralMurukku(ctx, cx, cy, r, color = ["#C8642A", "#8E3B16", "#E89A5C"]) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#6B3418"/>`;
    const spots = [[0, 0], ...Array.from({ length: 6 }, (_, i) => [Math.cos((i / 6) * TAU) * r * 0.55, Math.sin((i / 6) * TAU) * r * 0.55])];
    for (const [ox, oy] of spots.reverse()) {
      const sr = r * ctx.rand(0.34, 0.4);
      const x0 = cx + ox + ctx.rand(-8, 8), y0 = cy + oy + ctx.rand(-8, 8);
      const turns = 3.2, rot = ctx.rand(0, TAU);
      let d = "";
      for (let t = 0; t <= turns * TAU; t += 0.22) {
        const rad = sr * (0.12 + 0.88 * (t / (turns * TAU)));
        d += `${d ? "L" : "M"}${f(x0 + Math.cos(t + rot) * rad)} ${f(y0 + Math.sin(t + rot) * rad)}`;
      }
      const sw = f(sr * 0.2);
      s += `<g filter="url(#shs)"><path d="${d}" stroke="${color[1]}" stroke-width="${f(sr * 0.25)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${color[0]}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${color[1]}" stroke-opacity=".55" stroke-width="${sw}" stroke-dasharray="1.5 4" fill="none"/><path d="${d}" transform="translate(-1.5 -1.5)" stroke="${color[2]}" stroke-opacity=".6" stroke-width="${f(sr * 0.05)}" fill="none"/></g>`;
    }
    for (let i = 0; i < 90; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(ctx.rand(0.8, 1.8))}" fill="#9E2A12" opacity=".7"/>`;
    }
    return s;
  },

  ringMurukku(ctx, cx, cy, r) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#7A4A1E"/>`;
    for (let i = 0; i < 170; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.96);
      const rr = ctx.rand(13, 18) * (r / 190);
      const c = ctx.pick(["#D9A14A", "#CF9440", "#E2B05C", "#C8883A"]);
      s += `<g filter="url(#shs)"><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" stroke="#9A6424" stroke-width="${f(rr * 0.7)}" fill="none"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" stroke="${c}" stroke-width="${f(rr * 0.56)}" fill="none"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" stroke="#8A5520" stroke-opacity=".5" stroke-width="${f(rr * 0.56)}" stroke-dasharray="1.2 3.2" fill="none"/></g>`;
    }
    return s;
  },

  pakoda(ctx, cx, cy, r) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#6E3E14"/>`;
    for (let i = 0; i < 120; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.97);
      const pr = ctx.rand(16, 28) * (r / 190);
      const g = ctx.radial([[0, "#E7A94C"], [0.7, ctx.pick(["#C47A28", "#B96D22", "#CE8532"])], [1, "#8A4E16"]], { cx: "40%", cy: "38%" });
      s += `<g filter="url(#shs)"><path d="${blob(ctx, x, y, pr, 10, 0.55)}" fill="${g}"/>`;
      for (let k = 0; k < 4; k++) {
        const [dx, dy] = ctx.inCircle(x, y, pr * 0.7);
        s += `<circle cx="${f(dx)}" cy="${f(dy)}" r="${f(ctx.rand(1, 2.2))}" fill="#6A3510" opacity=".6"/>`;
      }
      s += `</g>`;
    }
    for (let i = 0; i < 10; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.85);
      s += curryLeaf(ctx, x, y, ctx.rand(18, 26), ctx.rand(0, 360)).replace(/#(2F5D2A|3A6B2F|467A35|2B5424)/, "#27401A");
    }
    return s;
  },

  sovi(ctx, cx, cy, r) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#7B5220"/>`;
    for (let i = 0; i < 90; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.95);
      const rx = ctx.rand(26, 32) * (r / 190), ry = rx * 0.68;
      const fill = ctx.pick(["#E3B865", "#D9A955", "#EBC77A"]);
      let ridges = "";
      for (let k = -2; k <= 2; k++) ridges += `M${f(k * rx * 0.3)} ${f(-ry * 0.85)}Q${f(k * rx * 0.36)} 0 ${f(k * rx * 0.3)} ${f(ry * 0.85)}`;
      s += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(ctx.rand(0, 180))})" filter="url(#shs)"><ellipse rx="${f(rx)}" ry="${f(ry)}" fill="${fill}" stroke="#A8762E" stroke-width="1.5"/><path d="${ridges}" stroke="#B0802F" stroke-opacity=".7" stroke-width="1.4" fill="none"/><path d="M${f(-rx * 0.55)} 0Q0 ${f(ry * 0.25)} ${f(rx * 0.55)} 0" stroke="#7A4E18" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
    }
    for (let i = 0; i < 90; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(ctx.rand(0.6, 1.4))}" fill="#FFF6E0" opacity=".85"/>`;
    }
    return s;
  },

  seeval(ctx, cx, cy, r) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#8A6424"/>`;
    for (let i = 0; i < 190; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.97);
      const rx = ctx.rand(22, 30) * (r / 190), ry = rx * ctx.rand(0.75, 0.95);
      s += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(ctx.rand(0, 180))})" filter="url(#shs)"><ellipse rx="${f(rx)}" ry="${f(ry)}" fill="${ctx.pick(["#F0D27A", "#E8C567", "#F4DC8E", "#E2B955"])}" stroke="#C09236" stroke-width="1.4"/><ellipse cx="${f(-rx * 0.2)}" cy="${f(-ry * 0.2)}" rx="${f(rx * 0.45)}" ry="${f(ry * 0.35)}" fill="#FFF3C4" opacity=".45"/></g>`;
    }
    for (let i = 0; i < 160; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(ctx.rand(0.6, 1.5))}" fill="#C23A1C" opacity=".75"/>`;
    }
    return s;
  },

  laddu(ctx, cx, cy, r) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#B98B3A"/>`;
    const lr = r * 0.3;
    const spots = [...Array.from({ length: 6 }, (_, i) => [Math.cos((i / 6) * TAU + 0.3) * r * 0.62, Math.sin((i / 6) * TAU + 0.3) * r * 0.62]), [0, 0]];
    for (const [ox, oy] of spots) {
      const x = cx + ox, y = cy + oy;
      const g = ctx.radial([[0, "#FBD072"], [0.55, "#F0A233"], [1, "#B8631A"]], { cx: "40%", cy: "36%", r: "62%" });
      s += `<g filter="url(#sh)"><circle cx="${f(x)}" cy="${f(y)}" r="${f(lr)}" fill="${g}"/>`;
      for (let k = 0; k < 90; k++) {
        const [dx, dy] = ctx.inCircle(x, y, lr * 0.95);
        s += `<circle cx="${f(dx)}" cy="${f(dy)}" r="${f(ctx.rand(2.2, 3.6))}" fill="${ctx.pick(["#F7B545", "#E89429", "#FFD27A", "#D9821F"])}" stroke="#A85A14" stroke-opacity=".35" stroke-width=".6"/>`;
      }
      s += cashew(ctx, x + ctx.rand(-lr * 0.4, 0), y + ctx.rand(-lr * 0.4, lr * 0.2), 0.5, ctx.rand(0, 360));
      s += `<ellipse cx="${f(x + lr * 0.3)}" cy="${f(y + lr * 0.25)}" rx="4" ry="3" fill="#4A1E24"/>`;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(lr)}" fill="${ctx.radial([[0.6, "#000", 0], [1, "#5A2A08", 0.4]])}"/></g>`;
    }
    return s;
  },

  watalappam(ctx, cx, cy, r) {
    const g = ctx.radial([[0, "#B87236"], [0.7, "#96531F"], [1, "#6E3A14"]], { cx: "42%", cy: "40%" });
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${g}"/>`;
    for (let i = 0; i < 90; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.95);
      const pr = ctx.rand(2, 6) * (r / 150);
      s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(pr)}" ry="${f(pr * 0.8)}" fill="#5A2C0E" opacity=".55"/><ellipse cx="${f(x - pr * 0.3)}" cy="${f(y - pr * 0.4)}" rx="${f(pr * 0.6)}" ry="${f(pr * 0.35)}" fill="#D69A5C" opacity=".4"/>`;
    }
    for (let i = 0; i < 5; i++) {
      const [x, y] = ctx.inCircle(cx, cy, r * 0.5);
      s += cashew(ctx, x, y, 0.9 * (r / 150), ctx.rand(0, 360));
    }
    return s;
  },
};

function foodInBowl(ctx, food, cx, cy, r, style) {
  const [b, inner, clip] = bowl(ctx, cx, cy, r, style);
  return `${b}<g clip-path="${clip}">${foods[food](ctx, cx, cy, inner)}${bowlShade(ctx, cx, cy, inner)}</g>`;
}

function surface(ctx, w, h, base = "#E8DAC0") {
  const vign = ctx.radial([[0.55, "#000", 0], [1, "#5A3A20", 0.16]]);
  return `<rect width="${w}" height="${h}" fill="${base}"/><rect width="${w}" height="${h}" filter="url(#grain)"/><rect width="${w}" height="${h}" fill="${vign}"/>`;
}

function woodSurface(ctx, w, h) {
  let s = `<rect width="${w}" height="${h}" fill="#2E1B10"/>`;
  const plank = 150;
  for (let y = 0, i = 0; y < h; y += plank, i++) {
    s += `<rect y="${y}" width="${w}" height="${plank - 3}" fill="${["#3A2315", "#33200F", "#402818"][i % 3]}"/>`;
    for (let k = 0; k < 14; k++) {
      const yy = y + ctx.rand(8, plank - 10);
      s += `<path d="M0 ${f(yy)}C${f(w * 0.3)} ${f(yy + ctx.rand(-6, 6))} ${f(w * 0.6)} ${f(yy + ctx.rand(-6, 6))} ${w} ${f(yy + ctx.rand(-4, 4))}" stroke="${ctx.pick(["#1F120A", "#4E3120"])}" stroke-opacity=".5" stroke-width="${f(ctx.rand(0.6, 1.6))}" fill="none"/>`;
    }
  }
  return s + `<rect width="${w}" height="${h}" filter="url(#grain)"/>`;
}

function wovenTray(ctx, cx, cy, r) {
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#C79A5B" filter="url(#sh)"/>`;
  for (let rr = r - 6; rr > 20; rr -= 9) {
    s += `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="${rr % 2 ? "#A87A3E" : "#D8B070"}" stroke-width="3" stroke-dasharray="7 5" stroke-opacity=".8"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#8C5E2A" stroke-width="14"/><circle cx="${cx}" cy="${cy}" r="${r - 7}" fill="none" stroke="#B88A4E" stroke-width="3"/>`;
  return s;
}

/* ---------- compositions ---------- */

const productArt = {
  "meat-sambol": { food: "sambol", bowl: "clay", garnish: "savory" },
  "dried-meat": { food: "driedMeat", bowl: "wood", garnish: "savory" },
  "babath-fry": { food: "babath", bowl: "clay", garnish: "savory" },
  "spicy-murukku": { food: "spiralMurukku", bowl: "brass", garnish: "savory" },
  "round-murukku": { food: "ringMurukku", bowl: "wood", garnish: "leafy" },
  pakoda: { food: "pakoda", bowl: "white", garnish: "leafy" },
  sovi: { food: "sovi", bowl: "brass", garnish: "sweet" },
  seeval: { food: "seeval", bowl: "wood", garnish: "leafy" },
  laddu: { food: "laddu", bowl: "brass", garnish: "sweet" },
  watalappam: { food: "watalappam", bowl: "clay", garnish: "sweet" },
};

function product(id, cfg) {
  const ctx = new Ctx(id);
  const W = 800, H = 600;
  let body = surface(ctx, W, H, ctx.pick(["#F0E0C2", "#EEDCBB", "#F2E4C9"]));
  body += bananaLeaf(ctx, 400, 310, 1000, 330, ctx.rand(-28, -18));
  const corners = [[110, 110], [690, 500], [700, 90], [95, 505]];
  if (cfg.garnish === "savory") {
    body += chilli(ctx, 90, 470, 120, -30) + chilli(ctx, 650, 95, 110, 160) + sprig(ctx, 705, 560, 150, -40) + sprig(ctx, 120, 190, 130, 210, 26);
  } else if (cfg.garnish === "leafy") {
    body += sprig(ctx, 90, 560, 170, 40) + sprig(ctx, 720, 60, 150, 200) + chilli(ctx, 640, 480, 100, 20);
  } else {
    body += cinnamon(ctx, 40, 120, 130, -20) + cinnamon(ctx, 620, 520, 140, 10);
    for (const [x, y] of corners) body += cardamom(ctx, x + ctx.rand(-30, 30), y + ctx.rand(-20, 20), 12, ctx.rand(0, 180));
    body += cashew(ctx, 690, 190, 1.2, 40) + cashew(ctx, 110, 400, 1.2, 200) + cashew(ctx, 140, 440, 1.1, 120);
  }
  body += foodInBowl(ctx, cfg.food, 400, 305, 225, cfg.bowl);
  return svgDoc(W, H, ctx, body);
}

function hero() {
  const ctx = new Ctx("hero");
  const S = 1000;
  let body = wovenTray(ctx, 500, 500, 470);
  body += bananaLeaf(ctx, 500, 500, 820, 380, -35);
  body += sprig(ctx, 170, 720, 160, 20) + sprig(ctx, 820, 250, 150, 200) + chilli(ctx, 440, 520, 110, 70) + chilli(ctx, 520, 470, 100, -110);
  body += cardamom(ctx, 560, 560, 12, 30) + cardamom(ctx, 590, 540, 12, 100) + cashew(ctx, 400, 600, 1.1, 20);
  body += foodInBowl(ctx, "sambol", 330, 350, 175, "clay");
  body += foodInBowl(ctx, "spiralMurukku", 680, 360, 165, "brass");
  body += foodInBowl(ctx, "laddu", 360, 690, 160, "brass");
  body += foodInBowl(ctx, "watalappam", 700, 690, 140, "clay");
  return svgDoc(S, S, ctx, body);
}

function banner() {
  const ctx = new Ctx("banner");
  const W = 1600, H = 800;
  let body = woodSurface(ctx, W, H);
  body += bananaLeaf(ctx, 1150, 420, 1200, 520, -18);
  body += sprig(ctx, 760, 760, 200, 30) + chilli(ctx, 1500, 90, 130, 150) + chilli(ctx, 860, 120, 110, 20) + cinnamon(ctx, 1420, 700, 150, -30);
  body += foodInBowl(ctx, "ringMurukku", 1000, 260, 200, "wood");
  body += foodInBowl(ctx, "driedMeat", 1380, 360, 190, "clay");
  body += foodInBowl(ctx, "seeval", 1080, 640, 180, "brass");
  body += foodInBowl(ctx, "laddu", 1450, 760, 170, "brass");
  return svgDoc(W, H, ctx, body);
}

function about() {
  const ctx = new Ctx("about");
  const W = 800, H = 1000;
  let body = surface(ctx, W, H, "#DCC9A8");
  body += bananaLeaf(ctx, 380, 520, 1100, 420, -62);
  body += sprig(ctx, 690, 980, 260, -20) + sprig(ctx, 90, 330, 200, 150) + chilli(ctx, 560, 110, 140, 160) + chilli(ctx, 600, 150, 120, 190) + chilli(ctx, 120, 900, 130, -60);
  // coconut half
  body += `<g filter="url(#sh)"><circle cx="640" cy="330" r="110" fill="#5A3519"/><circle cx="640" cy="330" r="95" fill="#FBF6EA"/><circle cx="640" cy="330" r="70" fill="#EFE6D2"/></g>`;
  body += `<g stroke="#3E2410" stroke-opacity=".5" stroke-width="2">${Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * TAU;
    return `<path d="M${f(640 + Math.cos(a) * 97)} ${f(330 + Math.sin(a) * 97)}L${f(640 + Math.cos(a) * 110)} ${f(330 + Math.sin(a) * 110)}"/>`;
  }).join("")}</g>`;
  body += foodInBowl(ctx, "sambol", 330, 560, 250, "clay");
  // spice bowls
  const spices = [
    [180, 170, "#C2361B"],
    [360, 130, "#D9A21E"],
    [640, 690, "#2A1D14"],
  ];
  for (const [x, y, c] of spices) {
    const [b, inner, clip] = bowl(ctx, x, y, 80, "white");
    let fill = `<circle cx="${x}" cy="${y}" r="${inner}" fill="${c}"/>`;
    for (let i = 0; i < 160; i++) {
      const [dx, dy] = ctx.inCircle(x, y, inner);
      fill += `<circle cx="${f(dx)}" cy="${f(dy)}" r="${f(ctx.rand(0.8, c === "#2A1D14" ? 3.2 : 1.6))}" fill="#fff" opacity="${c === "#2A1D14" ? 0.12 : 0.18}"/>`;
    }
    body += b + `<g clip-path="${clip}">${fill}${bowlShade(ctx, x, y, inner)}</g>`;
  }
  body += cinnamon(ctx, 470, 870, 170, -15) + cardamom(ctx, 560, 820, 14, 20) + cardamom(ctx, 600, 840, 14, 80);
  return svgDoc(W, H, ctx, body);
}

function write(rel, content) {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log(`${rel.padEnd(34)} ${(content.length / 1024).toFixed(1)} KB`);
}

for (const [id, cfg] of Object.entries(productArt)) write(`products/${id}.svg`, product(id, cfg));
write("hero-spread.svg", hero());
write("banner-spread.svg", banner());
write("about-kitchen.svg", about());
