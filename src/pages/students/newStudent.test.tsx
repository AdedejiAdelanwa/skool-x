/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import NewStudent from "./NewStudent";
import { createNewStudent } from "@/utils/api";
import { AppToast } from "@/components/AppToast";

// Mock the modules or functions used inside NewStudent
jest.mock("../../utils/api", () => {
  const originalModule = jest.requireActual("../../utils/api");
  return {
    __esModule: true,
    ...originalModule,
    createNewStudent: jest.fn().mockResolvedValue({}),
  };
}); 

jest.mock('../../components/AppToast', () => {
  const original = jest.requireActual("../../components/AppToast");
  return {
    __esModule: true,
    ...original,
    AppToast: jest.fn(),
  }
});

describe("NewStudent component", () => {
  it("submits the form successfully", async () => {
    // Arrange
    const onCloseAddDrawerMock = jest.fn();
    const addOpen = true;

    render(
      <NewStudent addOpen={addOpen} onCloseAddDrawer={onCloseAddDrawerMock} />
    );

    // Act
    await act(async () => {
      fireEvent.change(screen.getByTestId("firstname"), {target: {value: "John"}});
      fireEvent.change(screen.getByTestId("surname"), {target: {value: "Doe"}});
      fireEvent.change(screen.getByTestId("dateOfBirth"), {target: {value: "2002-01-01"}});
      fireEvent.change(screen.getByTestId("nationalId"), {target: {value: "1234567890"}});
      fireEvent.change(screen.getByTestId("studentNumber"), {target: {value: "skx001"}});
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Submit"));
      return new Promise((resolve) => setTimeout(() => resolve(), 3000));
    });

    // Assert
    // Check if createNewStudent is called with the correct data
    expect(createNewStudent).toHaveBeenCalled();
    expect(createNewStudent).toHaveBeenCalledWith({
      firstname: "John",
      surname: "Doe",
      dateOfBirth: "2002-01-01",
      nationalId: "1234567890",
      studentNumber: "skx001",
    });

    // Check if the form is reset
    await waitFor(() => {
      expect(screen.getByTestId<HTMLInputElement>("firstname").value).toBe("");
      expect(screen.getByTestId<HTMLInputElement>("surname").value).toBe("");
      expect(screen.getByTestId<HTMLInputElement>("dateOfBirth").value).toBe("");
      expect(screen.getByTestId<HTMLInputElement>("nationalId").value).toBe("");
      expect(screen.getByTestId<HTMLInputElement>("studentNumber").value).toBe("");
    });

    // Check if the onCloseAddDrawer function is called
    expect(onCloseAddDrawerMock).toHaveBeenCalled();

    // Check if success toast is displayed

    expect(AppToast).toHaveBeenCalledWith({
      type: "success",
      message: "Student added successfully",
      placement: "top-left",
    });

    //cleanup(<NewStudent />)
  });
});
