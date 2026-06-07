import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import ServiceWorkerRegister from "@/app/components/ServiceWorkerRegister";
import PullToRefresh from "@/app/components/PullToRefresh";
import "@/scss/main.scss";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "William Bosworth — Full-Stack Developer & CAIO",
  description:
    "William Bosworth — Full-Stack Developer, Professional Prompt Engineer, and Chief AI Officer of Nigerian AI Builders. Building intelligent systems and world-class digital products.",
  applicationName: "William Bosworth",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "William",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.svg"],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#07070b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body>
        <PullToRefresh />
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
