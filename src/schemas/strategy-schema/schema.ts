import * as yup from "yup";

export const strategySchema = yup.object({
  id: yup.string().required("ID is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  rules: yup
    .array()
    .of(yup.string())
    .defined()
    .min(1, "At least one rule is required"),
  type: yup.string().required("Type is required"),
});
