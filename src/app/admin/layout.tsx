export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ background: "#f8f9fa", minHeight: "100vh", padding: 32 }}>
      <header style={{ marginBottom: 24 }}>
        <h1>Panel de Administración</h1>
      </header>
      <main>{children}</main>
    </section>
  );
}
