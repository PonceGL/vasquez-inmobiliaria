import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

describe("Page", () => {
  it("renders the Next.js logo", () => {
    render(<Page />);

    const logo = screen.getByAltText("Next.js logo");

    expect(logo).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Page />);

    const deployLink = screen.getByText("Deploy now");
    const docsLink = screen.getByText("Read our docs");

    expect(deployLink).toBeInTheDocument();
    expect(docsLink).toBeInTheDocument();
  });
});
