import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1f3d2b" }}>
        <svg viewBox="0 0 64 64" width="180" height="180">
          <path d="M12 33h40a20 20 0 0 1-40 0Z" fill="#e0a04e" />
          <path d="M32 30c-2-9 2-16 13-19 1.4 10.5-3.6 17.5-13 19Z" fill="#f7f0e3" />
          <path d="M20 30c.4-5.4 3.6-9 9-10-.4 5.4-3.6 9-9 10Z" fill="#c0643f" />
        </svg>
      </div>
    ),
    size,
  );
}
