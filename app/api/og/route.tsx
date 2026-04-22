import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#08090b",
          color: "#f5f6f7",
          padding: 72,
          position: "relative",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        {/* subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* warm glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -100,
            width: 900,
            height: 600,
            background:
              "radial-gradient(ellipse at center, rgba(255,154,42,0.18), transparent 70%)",
          }}
        />

        {/* brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: "#ff9a2a",
              borderRadius: 2,
            }}
          />
          <span>{siteConfig.name}</span>
          <span style={{ color: "#9aa0aa", marginLeft: 6, fontWeight: 400 }}>
            / Web3 development studio
          </span>
        </div>

        {/* headline */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              maxWidth: 980,
            }}
          >
            Production-ready Web3 MVPs, shipped in 8 weeks.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: "#9aa0aa",
            }}
          >
            <span>Ethereum</span>
            <span style={{ color: "#2a2e36" }}>·</span>
            <span>Bitcoin</span>
            <span style={{ color: "#2a2e36" }}>·</span>
            <span>RWA</span>
            <span style={{ color: "#2a2e36" }}>·</span>
            <span>Dubai</span>
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#9aa0aa",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                background: "#10b981",
                borderRadius: 999,
              }}
            />
            Accepting 2 build slots — Q3
          </div>
          <div>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
