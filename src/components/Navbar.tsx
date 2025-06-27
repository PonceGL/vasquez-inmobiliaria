export default function Navbar() {
  return (
    <nav style={{ padding: 16, borderBottom: "1px solid #eee" }}>
      <a href="/">Inicio</a> | <a href="/about">Acerca</a> |{" "}
      <a href="/blog">Blog</a>
    </nav>
  );
}
