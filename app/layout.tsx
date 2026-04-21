import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "YellowLAB 3D | Impression 3D Professionnelle",
  description:
    "Service d'impression 3D professionnel — FDM, résine, post-traitement. Devis immédiat, livraison rapide. Qualité industrielle pour vos projets.",
  keywords: "impression 3D, FDM, résine, prototypage, fabrication, YellowLAB",
  openGraph: {
    title: "YellowLAB 3D | Impression 3D Professionnelle",
    description: "Service d'impression 3D professionnel — FDM, résine, post-traitement.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="noise-overlay">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
