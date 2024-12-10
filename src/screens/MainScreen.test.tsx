import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import MainScreen from "../screens/MainScreen"; // Adjust the path based on your file structure

describe("MainScreen", () => {
  it("should show an error message when fields are empty", async () => {
    const { getByPlaceholderText, getByText } = render(<MainScreen />);

    fireEvent.changeText(getByPlaceholderText("Pet Name"), "");
    fireEvent.changeText(getByPlaceholderText("Pet Age"), "");
    fireEvent.changeText(getByPlaceholderText("Pet Description"), "");
    fireEvent.press(getByText("Add Pet"));

    await waitFor(() => {
      expect(getByText("Please fill in all required fields.")).toBeTruthy();
    });
  });

  it("should show an error message for invalid age", async () => {
    const { getByPlaceholderText, getByText } = render(<MainScreen />);

    fireEvent.changeText(getByPlaceholderText("Pet Name"), "Fluffy");
    fireEvent.changeText(getByPlaceholderText("Pet Age"), "0");
    fireEvent.changeText(
      getByPlaceholderText("Pet Description"),
      "A cute pet."
    );
    fireEvent.press(getByText("Add Pet"));

    await waitFor(() => {
      expect(
        getByText("Please enter a valid age greater than 0.")
      ).toBeTruthy();
    });
  });

  it("should submit the form with valid inputs", async () => {
    const { getByPlaceholderText, getByText } = render(<MainScreen />);

    fireEvent.changeText(getByPlaceholderText("Pet Name"), "Fluffy");
    fireEvent.changeText(getByPlaceholderText("Pet Age"), "2");
    fireEvent.changeText(
      getByPlaceholderText("Pet Description"),
      "A cute pet."
    );
    fireEvent.press(getByText("Add Pet"));

    await waitFor(() => {
      expect(getByText("Fluffy")).toBeTruthy();
    });
  });
});
