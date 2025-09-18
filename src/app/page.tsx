export default function Home() {
  const name = process.env.NEXT_PUBLIC_NAME;
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Bienvenido a Next.js!</h1>
      <p>Página de inicio para nuestra app.</p>
      <p>name: {name}</p>
    </main>
  );
}
