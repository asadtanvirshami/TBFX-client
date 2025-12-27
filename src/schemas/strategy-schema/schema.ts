import * as yup from "yup";

export const strategySchema = yup.object({
  id: yup
    .string()
    .uuid("ID must be a valid UUID") // better practice than just string
    .required("ID is required"),

  title: yup
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters")
    .required("Title is required"),

  comment: yup
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .required("Description is required"),

  // rules: yup
  //   .array()
  //   .of(
  //     yup
  //       .string()
  //       .trim()
  //       .min(3, "Each rule must be at least 3 characters long")
  //       .max(300, "Each rule cannot exceed 300 characters")
  //   )
  //   .defined()
  //   .min(1, "At least one rule is required")
  //   .max(50, "Too many rules, max 50 allowed"), // prevents abuse

  accessLevel: yup
    .string()
    .oneOf(["STANDARD", "ELITE"], "Invalid access level")
    .default("STANDARD"),
  isPremium: yup.boolean().default(false),

  price: yup
    .number()
    .when("isPremium", {
      is: true,
      then: (schema) =>
        schema.min(1, "Premium strategies must have a price greater than 0"),
      // otherwise: (schema) => schema.min(0),
    })
    .default(0),

  currency: yup
    .string()
    .oneOf(["USD", "EUR", "GBP", "PKR"], "Unsupported currency")
    .default("USD"),

  status: yup
    .string()
    .oneOf(["DRAFT", "PUBLISHED", "ARCHIVED"], "Invalid status")
    .default("DRAFT"),

  type: yup
    .string()
    .oneOf(["STANDARD", "ELITE", "ADDON", "PERSONAL"], "Invalid type") // no space
    .default("PERSONAL"),

  hasPrice: yup.boolean().required().default(false),

  userId: yup
    .string()
    .uuid("User ID must be a valid UUID")
    .required("User ID is required"),
});
