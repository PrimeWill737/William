import type { Metadata } from "next";
import "@/scss/main.scss";

export const metadata: Metadata = {
  title: "William",
  description: "William – Fullstack Developer. TypeScript, JavaScript, React, Node.js, Next.js, PHP, SCSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
