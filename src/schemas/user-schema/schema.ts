import * as yup from "yup";

export const updateProfileSchema = yup.object({
  id: yup.string().required("ID is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});
