import type { ReactElement } from "react";

export function BrandIconMarkup(size: number): ReactElement {
  const fontSize = Math.round(size * 0.44);
  const borderRadius = Math.round(size * 0.22);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #00e5b0 0%, #818cf8 100%)",
        borderRadius,
        fontSize,
        fontWeight: 800,
        color: "#07070b",
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "-0.02em",
      }}
    >
      W
    </div>
  );
}
