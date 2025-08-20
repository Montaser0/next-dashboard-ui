import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { IBM_Plex_Sans_Arabic } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] });

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans-arabic',
})

export const metadata: Metadata = {
  title: "نظام ادارة المدارس والجامعات",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className={ibmPlexSansArabic.variable}>
      <body className="font-ibm-plex-sans-arabic bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
