import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "YellowLAB 3D | Impression 3D Professionnelle",
  description: "Service d'impression 3D professionnel — FDM, résine, post-traitement.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />
      </head>
      <body className="noise-overlay">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}