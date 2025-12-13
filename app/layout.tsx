import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { cheryRush, myriadPro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALDEE'S | Fresh Picks, Flavor Hits",
  description:
    "Experience bold flavors and vintage vibes at ALDEE'S. Bite into bold - your cravings deserve this goodness.",
  icons: {
    icon: [
      {
        url: "/navbar_mobile_logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/navbar_mobile_logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/navbar_mobile_logo.png",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myriadPro.variable} ${cheryRush.variable} font-sans antialiased bg-aldees-black text-aldees-offwhite overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
