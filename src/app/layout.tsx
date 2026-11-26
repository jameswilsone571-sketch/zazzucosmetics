import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { PreviewDock } from "@/components/PreviewDock";

export const metadata: Metadata = {
  title: "ZAZZU Cosmetics — Beauty, unveiled soon.",
  description: "ZAZZU Cosmetics is coming soon. Clean, long-lasting makeup made for every skin tone. Join the list for early access and 15% off at launch.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
        <PreviewDock />
      </body>
    </html>
  );
}
