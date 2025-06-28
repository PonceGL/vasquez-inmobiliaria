import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/(public)/page";

describe("Page", () => {
  it("renders the Next.js logo", () => {
    render(<Page />);

    const logo = screen.getByText("Home");

    expect(logo).toBeInTheDocument();
  });
});
