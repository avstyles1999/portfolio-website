import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Anmol Verma — Software Engineering Lead",
  description:
    "Portfolio of Anmol Verma, Team Lead Software Development — real-time, safety-critical systems and AI-driven automation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-brand-bg text-brand-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
