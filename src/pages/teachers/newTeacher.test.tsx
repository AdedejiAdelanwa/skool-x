/**
 * @jest-environment jsdom
 */

import {
    render,
    screen,
    fireEvent,
    waitFor,
    getByLabelText,
  } from "@testing-library/react";
  import { act } from "@testing-library/react";
  import NewTeacher from "./Newteacher";
  import { createNewTeacher } from "@/utils/api";
  import { AppToast } from "@/components/AppToast";
import userEvent from "@testing-library/user-event";

  // Mock the modules or functions used inside NewTeacher
jest.mock("../../utils/api", () => {
    const originalModule = jest.requireActual("../../utils/api");
    return {
      __esModule: true,
      ...originalModule,
      createNewTeacher: jest.fn().mockResolvedValue({}),
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

  describe("NewTeacher component",()=>{
    it("submits the form successfully", async ()=>{
        const onCloseAddDrawerMock = jest.fn();
        const addOpen = true;

        render(
            <NewTeacher addOpen={addOpen} onCloseAddDrawer={onCloseAddDrawerMock } />
        );

        await act(async ()=>{
            fireEvent.change(screen.getByTestId("firstname"), {target: {value: "John"}});
            fireEvent.change(screen.getByTestId("surname"), {target: {value: "Doe"}});
            fireEvent.change(screen.getByTestId("dateOfBirth"), {target: {value: "2002-01-01"}});
            fireEvent.change(screen.getByTestId("nationalId"), {target: {value: "1234567890"}});
            fireEvent.change(screen.getByTestId("teacherNumber"), {target: {value: "tn001"}});
            fireEvent.change(screen.getByTestId("title"), {target: {value: "Mr"}});
            fireEvent.change(screen.getByTestId("salary"), {target: {value: 45000}});
        });

        await act(async () => {
            fireEvent.click(screen.getByText("Submit"));
            return new Promise((resolve) => setTimeout(() => resolve(), 3000));
          });

          expect(createNewTeacher).toHaveBeenCalled();
          expect(createNewTeacher).toHaveBeenCalledWith({
            firstname: "John",
            surname: "Doe",
            dateOfBirth: "2002-01-01",
            nationalId: "1234567890",
            teacherNumber: "tn001",
            // title: "Mr",
            salary: 45000
          });

          await waitFor(() => {
            expect(screen.getByTestId<HTMLInputElement>("firstname").value).toBe("");
            expect(screen.getByTestId<HTMLInputElement>("surname").value).toBe("");
            expect(screen.getByTestId<HTMLInputElement>("dateOfBirth").value).toBe("");
            expect(screen.getByTestId<HTMLInputElement>("nationalId").value).toBe("");
            expect(screen.getByTestId<HTMLInputElement>("teacherNumber").value).toBe("");
            expect(screen.getByTestId<HTMLInputElement>("title").value).toBe("");
          });

          expect(onCloseAddDrawerMock).toHaveBeenCalled();

          expect(AppToast).toHaveBeenCalledWith({
            type: "success",
            message: "Teacher added successfully",
            placement: "top-left",
          });
    })
  })