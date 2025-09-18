import { render, screen } from "@testing-library/react";

import RootLayout from "./layout";

describe("RootLayout", () => {
  it("debería renderizar a sus hijos (children) correctamente", () => {
    const testId = "test-child";
    const TestChildComponent = <div data-testid={testId}>Hola Mundo</div>;

    render(<RootLayout>{TestChildComponent}</RootLayout>);

    const childElement = screen.getByTestId(testId);

    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Hola Mundo");
  });
});
