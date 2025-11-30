import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const noto = Noto_Serif_JP({
  variable: "--font-noto",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "grid64",
  description: "become the best version of yourself with harada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${noto.className} antialiased bg-black text-white overflow-y-clip`}
      >
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
