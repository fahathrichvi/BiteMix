/**
 * Renders the generated SVG artwork (scripts/art) to PNG in public/images
 * with headless Chrome/Edge, so Next.js <Image> can serve AVIF/WebP.
 * Run with: npm run art
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "art");
const out = join(here, "..", "public", "images");
const SCALE = 1.5;

const browser = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((b) => b && existsSync(b));
if (!browser) throw new Error("No Chrome/Edge found — set CHROME_PATH.");

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith(".svg") ? [join(dir, e.name)] : [],
  );

for (const file of walk(src)) {
  const [, w, h] = readFileSync(file, "utf8").match(/viewBox="0 0 (\d+) (\d+)"/).map(Number);
  const rel = file.slice(src.length + 1).replace(/\.svg$/, ".png");
  const target = join(out, rel);
  mkdirSync(dirname(target), { recursive: true });
  const page = join(src, "_page.html");
  writeFileSync(
    page,
    `<html><body style="margin:0;background:transparent"><img src="${pathToFileURL(file).href}" width="${w * SCALE}" height="${h * SCALE}" style="display:block"></body></html>`,
  );
  execFileSync(browser, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
    "--default-background-color=00000000", `--window-size=${w * SCALE},${h * SCALE}`,
    `--screenshot=${target}`, pathToFileURL(page).href,
  ], { stdio: "ignore" });
  rmSync(page);
  console.log("rendered", rel);
}
