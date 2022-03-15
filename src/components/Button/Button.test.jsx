import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Button", () => {


  const onClick = jest.fn();
  const buttonText="sample";
  const component = (
    <MemoryRouter initialEntries={[`/tests`]}>
      <Routes>
        <Route
          path={`/tests`}
          element={<Button buttonText={buttonText} onClick={onClick} />}
        ></Route>
      </Routes>
    </MemoryRouter>
  );

  beforeEach(() => {
    onClick.mockClear();
  });
  it("should update the button text when the button is clicked", () => {
    render(component);

    fireEvent.click(screen.getByText("sample"));
    fireEvent.click(screen.getByText("sample"));
    fireEvent.click(screen.getByText("sample"));

    expect(onClick).toHaveBeenCalledTimes(3);});

});