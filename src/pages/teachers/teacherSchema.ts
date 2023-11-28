import * as Yup from "yup";


export const formattedMaxDate = new Date(
  new Date().setFullYear(new Date().getFullYear() - 21)
)
  .toISOString()
  .split("T")[0];

export const teacherSchema = Yup.object({
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
      .max(formattedMaxDate, "Must be at least 21 years old")
      .required("date of Birth is required"),
    teacherNumber: Yup.string().required("Teacher number is required"),
    title: Yup.string(),
   salary: Yup.number()
  });