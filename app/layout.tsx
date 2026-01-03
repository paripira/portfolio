import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fakhri Aprianza | Web Portfolio", // Ganti Nama Kamu
  description: "Interactive OS Portfolio featuring Cisco Network Topology interface. Explore my projects, skills, and contact me securely.",
  icons: {
    icon: '/favicon.ico', // Kita akan ganti file ini
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}