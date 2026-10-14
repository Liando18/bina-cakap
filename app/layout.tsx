import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BINA CAKAP Digital Desa Cikawao | PPM Universitas Bhakti Kencana",
  description: "Platform Penguatan Literasi, Etika, Budaya, dan Keamanan Digital Kader, Keluarga, Remaja, dan UMKM Desa Cikawao.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] antialiased">
        {children}
      </body>
    </html>
  );
}
