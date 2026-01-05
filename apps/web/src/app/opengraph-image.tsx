import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Spilwood — Спилы и пеньки от производителя";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        backgroundImage:
          "radial-gradient(circle at 25% 25%, #f0f0f0 0%, transparent 50%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              aria-label="Spilwood logo"
            >
              <title>Spilwood logo</title>
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Spilwood
          </span>
        </div>

        <p
          style={{
            fontSize: 32,
            color: "#666",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Спилы и пеньки от производителя
        </p>

        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 24, color: "#1a1a1a", fontWeight: 500 }}>
              Берёза
            </span>
            <span style={{ fontSize: 16, color: "#888" }}>
              Светлая древесина
            </span>
          </div>
          <div
            style={{
              width: 1,
              height: 48,
              backgroundColor: "#e0e0e0",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 24, color: "#1a1a1a", fontWeight: 500 }}>
              Сосна
            </span>
            <span style={{ fontSize: 16, color: "#888" }}>Тёплые оттенки</span>
          </div>
          <div
            style={{
              width: 1,
              height: 48,
              backgroundColor: "#e0e0e0",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 24, color: "#1a1a1a", fontWeight: 500 }}>
              Пеньки
            </span>
            <span style={{ fontSize: 16, color: "#888" }}>Для декора</span>
          </div>
        </div>
      </div>

      <p
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 18,
          color: "#888",
        }}
      >
        Тверская область • Доставка по России
      </p>
    </div>,
    {
      ...size,
    }
  );
}
