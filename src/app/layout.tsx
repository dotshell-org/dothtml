import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dotshell",
    template: "%s | Dotshell"
  },
  description: "Dotshell develops open source software solutions for businesses. Our mission is to make open source the best option for all your software needs.",
  keywords: ["open source", "software", "business software", "cafeteria manager", "ico", "accounting software", "inventory management", "French software"],
  authors: [{ name: "Dotshell" }],
  creator: "Dotshell",
  publisher: "Dotshell",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://dotshell.eu"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "fr-FR": "/fr-FR",
    },
  },
  openGraph: {
    title: "Dotshell",
    description: "Dotshell develops open source software solutions for businesses. Our mission is to make open source the best option for all your software needs.",
    url: "https://dotshell.eu",
    siteName: "Dotshell",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dotshell",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dotshell",
    description: "Dotshell develops open source software solutions for businesses. Our mission is to make open source the best option for all your software needs.",
    images: ["/images/twitter-image.jpg"],
    creator: "@dotshell",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-white`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
