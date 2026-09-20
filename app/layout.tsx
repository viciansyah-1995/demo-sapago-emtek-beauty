import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SapaGo AI — Multi Brand Experience",
  description: "Explore FFAR, Wondermist, and Majika in one interactive SapaGo AI brand demo.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: {
      url: "/assets/sapago/sapago-logo.png?v=20260920",
      type: "image/png",
    },
    shortcut: "/assets/sapago/sapago-logo.png?v=20260920",
    apple: "/assets/sapago/sapago-logo.png?v=20260920",
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
