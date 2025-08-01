import localFont from "next/font/local";
import "./globals.css";

import TopNavigation from "@/ui/components/top-navigation";
import { ReactNode } from "react";

const yekanbakh = localFont({
  src: [
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanbakh/YekanBakhFaNum-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-yekanbakh",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="">
      <body
        className={`${yekanbakh.variable} antialiased bg-secondary-900 text-sm `}
      >
        <TopNavigation />
        {children}
      </body>
    </html>
  );
}
