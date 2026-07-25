import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: 80,
            background: "#FF6B00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000000",
            fontSize: 160,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          LM
        </div>
      </div>
    ),
    { ...size },
  );
}
