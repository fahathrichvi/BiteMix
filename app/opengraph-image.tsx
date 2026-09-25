import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "BITE MIX — Homemade Sri Lankan food";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin-only text: the OG renderer cannot shape Tamil script reliably.
export default async function OpenGraphImage() {
  const hero = await readFile(join(process.cwd(), "public/images/hero-spread.png"));
  const heroSrc = `data:image/png;base64,${hero.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f7f0e3", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 600 }}>
          <div style={{ display: "flex", fontSize: 30, color: "#a4502f", letterSpacing: 4 }}>HOMEMADE · SRI LANKAN</div>
          <div style={{ display: "flex", fontSize: 118, fontWeight: 800, color: "#1f3d2b", marginTop: 12, letterSpacing: 4 }}>
            BITE<span style={{ color: "#c0643f", marginLeft: 26 }}>MIX</span>
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#5c3a24", marginTop: 18, lineHeight: 1.35 }}>
            Traditional homemade food, delivered to your door.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              background: "#178a4b",
              color: "white",
              fontSize: 28,
              padding: "14px 30px",
              borderRadius: 999,
              alignSelf: "flex-start",
            }}
          >
            Order on WhatsApp
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroSrc} width={640} height={640} style={{ position: "absolute", right: -40, top: -5 }} alt="" />
      </div>
    ),
    size,
  );
}
