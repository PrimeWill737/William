import { ImageResponse } from "next/og";
import { BrandIconMarkup } from "@/lib/brand-icon";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(BrandIconMarkup(192), {
    width: 192,
    height: 192,
  });
}
