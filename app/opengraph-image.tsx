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
  const logo = await readFile(join(process.cwd(), "public/brand/bite-mix-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f7f0e3", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 600 }}>
          <div style={{ display: "flex", fontSize: 30, color: "#a4502f", letterSpacing: 4 }}>HOMEMADE · SRI LANKAN</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={250} height={250} style={{ marginTop: 8, marginLeft: -12 }} alt="" />
          <div style={{ display: "flex", fontSize: 34, color: "#5c3a24", marginTop: 6, lineHeight: 1.35 }}>
            Traditional homemade food, delivered to your door.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
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
