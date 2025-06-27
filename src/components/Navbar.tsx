import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: 16, borderBottom: "1px solid #eee" }}>
      <Link href="/">Inicio</Link> | <a href="/about">Acerca</a> |{" "}
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
