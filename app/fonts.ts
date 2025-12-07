import localFont from "next/font/local";

export const cheryRush = localFont({
  src: [
    {
      path: "../public/fonts/CheryRush-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-chery-rush",
  display: "swap",
});

export const myriadPro = localFont({
  src: [
    {
      path: "../public/fonts/SourceSans3-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SourceSans3-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/SourceSans3-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-myriad-pro",
  display: "swap",
});
