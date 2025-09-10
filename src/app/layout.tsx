import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_Components/Navbar/Navbar";
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
  description: "Discover premium quality products at unbeatable prices. Shop from our wide range of fashion, electronics, and daily essentials.",
  keywords: ["ecommerce", "online shopping", "fashion", "electronics", "fresh cart"],
  authors: [{ name: "Abdelfattah Elnaggar" }],
  icons: {
    icon: "/Assets/screens/favicon/shopping.png",
    shortcut: "/Assets/screens/favicon/shopping.png",
    apple: "/Assets/screens/favicon/shopping.png",
  },
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
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
