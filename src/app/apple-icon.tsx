import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563EB",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 108,
            height: 108,
            borderRadius: 54,
            background: "#2563EB",
            border: "4px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            textTransform: "lowercase",
          }}
        >
          lm
        </div>
      </div>
    ),
    { ...size },
  );
}
