import React from "react";
import { render } from "@testing-library/react";
import Simple from "./Simple";

describe("Header tests", () => {
  test("renders learn react link", () => {
    const { getByText } = render(<Simple />);
    getByText("hello");
  });
});
