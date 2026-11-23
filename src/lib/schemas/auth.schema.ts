import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Full name is required.")
      .min(2, "Name must be at least 2 characters."),
    email: z
      .string()
      .nonempty("Email is required.")
      .email("Please enter a valid email address."),
    phone: z
      .string()
      .nonempty("Phone number is required.")
      .regex(
        /^(\+2)?01[0125][0-9]{8}$/,
        "Please enter a valid Egyptian phone number.",
      ),
    password: z
      .string()
      .nonempty("Password is required.")
      .min(8, "Password must be at least 8 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include uppercase, lowercase, number, and special character.",
      ),
    rePassword: z.string().nonempty("Please confirm your password."),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    { path: ["rePassword"], message: "Passwords do not match." },
  );

export const loginSchema = z.object({
  email: z
      .string()
      .nonempty("Email is required.")
      .email("Please enter a valid email address."),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character.",
    ),
});


export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Current password is required.")
      .min(8, "Password must be at least 8 characters long."),

    password: z
      .string()
      .nonempty("New password is required.")
      .min(8, "Password must be at least 8 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include uppercase, lowercase, number, and special character."
      ),

    rePassword: z
      .string()
      .nonempty("Please confirm your new password."),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match.",
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
});

export type ForgotPasswordSchemaType = z.infer<
  typeof forgotPasswordSchema
>;


export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
