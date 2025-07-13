import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Dashboard - Real-time Weather & 5-Day Forecast",
  description: "Get real-time weather information and 5-day forecasts for any city worldwide. Built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: ["weather", "forecast", "temperature", "climate", "next.js", "react"],
  authors: [{ name: "Weather Dashboard Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Weather Dashboard",
    description: "Real-time weather data and forecasts for cities worldwide",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Dashboard",
    description: "Real-time weather data and forecasts for cities worldwide",
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
      >
        {children}
      </body>
    </html>
  );
}
