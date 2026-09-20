import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SapaGo AI — Multi Brand Experience",
  description: "Explore FFAR, Wondermist, and Majika in one interactive SapaGo AI brand demo.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
