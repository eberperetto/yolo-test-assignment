import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "../components/title";

test("renders without subtitle", () => {
  render(<Title title="Title" />);
  expect(screen.getByRole("heading")).toHaveTextContent("Title");
});

test("renders with subtitle", () => {
  render(<Title title="Title" subtitle="Subtitle" />);
  expect(screen.getByRole("heading")).toHaveTextContent("Title");
  expect(screen.getByText("Subtitle")).toBeInTheDocument();
});
