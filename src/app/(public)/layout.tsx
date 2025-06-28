import "../globals.css";

import { Footer, Navbar } from "@/components";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vasquez Inmobiliaria",
  description: "Sitio público de Vasquez Inmobiliaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
