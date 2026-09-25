/**
 * Builds every logo and favicon asset from the brand logo.
 * Run with: npm run logo
 *
 * Source: scripts/brand/logo-source.png (logo on a white background)
 *  1. Removes the white background (flood fill from the edges, so white
 *     details inside the artwork — garlic, highlights — are kept).
 *  2. Writes the transparent site logo, favicons, Apple and PWA icons.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "scripts", "brand", "logo-source.png");
const CREAM = { r: 252, g: 248, b: 241, alpha: 1 };

/** Whiteness threshold: pixels at least this light on every channel count as background. */
const BG_MIN = 232;

async function cutOut() {
  const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const px = w * h;
  const minCh = new Uint8Array(px);
  for (let i = 0; i < px; i++) minCh[i] = Math.min(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]);

  // Flood fill background from every border pixel.
  const bg = new Uint8Array(px);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const i = stack.pop();
    if (bg[i] || minCh[i] < BG_MIN) continue;
    bg[i] = 1;
    const x = i % w;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (i >= w) stack.push(i - w);
    if (i < px - w) stack.push(i + w);
  }

  // Anti-aliased edge band: pixels touching the background get
  // "colour to alpha" against white so edges stay smooth.
  const band = new Uint8Array(px);
  for (let i = 0; i < px; i++) {
    if (!bg[i]) continue;
    const x = i % w;
    for (const j of [i - 1, i + 1, i - w, i + w, i - w - 1, i - w + 1, i + w - 1, i + w + 1]) {
      if (j < 0 || j >= px || Math.abs((j % w) - x) > 1) continue;
      if (!bg[j]) band[j] = 1;
    }
  }

  const out = Buffer.alloc(px * 4);
  for (let i = 0; i < px; i++) {
    let [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
    let a = 255;
    if (bg[i]) a = 0;
    else if (band[i]) {
      const alpha = Math.max(255 - r, 255 - g, 255 - b) / 255;
      const k = Math.min(1, alpha * 1.6);
      if (k <= 0.02) a = 0;
      else {
        r = Math.round(Math.min(255, Math.max(0, (r - 255 * (1 - alpha)) / alpha)));
        g = Math.round(Math.min(255, Math.max(0, (g - 255 * (1 - alpha)) / alpha)));
        b = Math.round(Math.min(255, Math.max(0, (b - 255 * (1 - alpha)) / alpha)));
        a = Math.round(k * 255);
      }
    }
    out.set([r, g, b, a], i * 4);
  }
  return sharp(out, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
}

function save(rel, buf) {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, buf);
  console.log(`${rel.padEnd(34)} ${(buf.length / 1024).toFixed(1)} KB`);
}

/** Square icon: logo centred on a solid (or transparent) background. */
async function squareIcon(logo, size, { pad = 0.04, background = CREAM } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const resized = await sharp(logo).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: resized, gravity: "center" }])
    .png({ palette: true, quality: 92, compressionLevel: 9 })
    .toBuffer();
}

/** Round badge icon (cream disc, transparent corners) — reads well on light and dark browser tabs. */
async function roundIcon(logo, size) {
  const disc = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="rgb(252,248,241)"/></svg>`,
  );
  const inner = Math.round(size * 0.94);
  const resized = await sharp(logo).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp(disc).composite([{ input: resized, gravity: "center" }]).png({ palette: true, quality: 92, compressionLevel: 9 }).toBuffer();
}

/** Multi-resolution .ico built from PNG entries (supported by all modern browsers). */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.buf)]);
}

const transparent = await cutOut();
// Trim empty margins, then square it back up so the artwork stays centred.
const trimmed = await sharp(transparent).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
const side = Math.max(trimmed.info.width, trimmed.info.height);
const logo = await sharp(trimmed.data)
  .resize(side, side, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

// Site logo (Next <Image> serves AVIF/WebP from this).
save("public/brand/bite-mix-logo.png", await sharp(logo).resize(640, 640).png({ palette: true, quality: 95, compressionLevel: 9 }).toBuffer());

// Favicons (Next.js app-directory file conventions).
const ico16 = await roundIcon(logo, 16);
const ico32 = await roundIcon(logo, 32);
const ico48 = await roundIcon(logo, 48);
save("app/favicon.ico", ico([
  { size: 16, buf: ico16 },
  { size: 32, buf: ico32 },
  { size: 48, buf: ico48 },
]));
save("app/icon.png", await roundIcon(logo, 192));
save("app/apple-icon.png", await squareIcon(logo, 180, { pad: 0.06 }));

// PWA manifest icons.
save("public/icons/icon-192.png", await roundIcon(logo, 192));
save("public/icons/icon-512.png", await roundIcon(logo, 512));
save("public/icons/icon-maskable-512.png", await squareIcon(logo, 512, { pad: 0.12 }));
