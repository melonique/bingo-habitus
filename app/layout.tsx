import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookiesProvider } from 'next-client-cookies/server';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bingo Habitus",
  description: "Generated with AI for fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>{children}</CookiesProvider>
      </body>
    </html>
  );
}
