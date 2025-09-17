import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollButtons from "@/components/layout/scroll-buttons";

export const metadata: Metadata = {
  title: "PT BPR Jabar Perseroda - Bank Perkreditan Rakyat Terpercaya",
  description: "PT BPR Jabar Perseroda adalah Bank Perkreditan Rakyat yang berkomitmen untuk mendukung perekonomian masyarakat Jawa Barat melalui layanan perbankan yang profesional dan terpercaya.",
  keywords: ["BPR Jabar", "Bank Perkreditan Rakyat", "Jawa Barat", "Tabungan", "Deposito", "Kredit", "Bank Syariah", "UMKM"],
  authors: [{ name: "PT BPR Jabar Perseroda" }],
  openGraph: {
    title: "PT BPR Jabar Perseroda - Bank Perkreditan Rakyat Terpercaya",
    description: "Layanan perbankan profesional dan terpercaya untuk mendukung perekonomian masyarakat Jawa Barat",
    url: "https://bprjabar.co.id",
    siteName: "BPR Jabar Perseroda",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT BPR Jabar Perseroda",
    description: "Bank Perkreditan Rakyat Terpercaya di Jawa Barat",
  },
  other: {
    'theme-color': '#10b981',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="theme-jade-oasis">
      <body className="antialiased bg-background text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollButtons />
        <Toaster />
      </body>
    </html>
  );
}
