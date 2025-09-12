import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_Components/Navbar/Navbar";
import UpperNavbar from "@/app/_Components/UpperNavbar/UpperNavbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/Providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart - Modern Ecommerce Store",
  description:
    "Discover premium quality products at unbeatable prices. Shop from our wide range of fashion, electronics, and daily essentials.",
  keywords: [
    "ecommerce",
    "online shopping",
    "fashion",
    "electronics",
    "fresh cart",
  ],
  authors: [{ name: "Abdelfattah Elnaggar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Toaster />
          <UpperNavbar />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
