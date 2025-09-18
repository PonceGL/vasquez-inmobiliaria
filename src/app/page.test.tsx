import { render, screen } from "@testing-library/react";

import Home from "@/app/page";

describe("Página de Inicio", () => {
  it("debería renderizar el encabezado principal", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Bienvenido a Next.js!/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
