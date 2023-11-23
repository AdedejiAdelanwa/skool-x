import * as Yup from "yup";


export const formattedMinDate = new Date(
  new Date().setFullYear(new Date().getFullYear() - 22)
)
  .toISOString()
  .split("T")[0];

export const studentSchema = Yup.object({
    firstname: Yup.string()
      .min(3, "Enter min. of 3 characters")
      .required("First name is required"),
    surname: Yup.string()
      .min(3, "Enter min. of 3 characters")
      .required("Surname is required"),
    nationalId: Yup.string()
      .min(10, "Minimum of 10 characters")
      .max(10, "maximum of 10 characters")
      .required("Nation ID is required"),
    dateOfBirth: Yup.date()
      .min(formattedMinDate, "Must be at most 22 years old")
      .required("date of Birth is required"),
    studentNumber: Yup.string().required("Student number is required"),
  });