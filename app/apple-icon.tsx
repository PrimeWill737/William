import { ImageResponse } from "next/og";
import { BrandIconMarkup } from "@/lib/brand-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(BrandIconMarkup(180), { ...size });
}
