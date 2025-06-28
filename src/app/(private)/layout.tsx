import "../globals.css";

import { Footer } from "@/components";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header className="w-full p-4 flex justify-between items-center">
          <h1>Admin</h1>
          <nav style={{ padding: 16, borderBottom: "1px solid #eee" }}>
            <Link href="/">Inicio</Link>
          </nav>
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
