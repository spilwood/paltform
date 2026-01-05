import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Введите email").email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
  rememberMe: z.boolean(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно быть не менее 2 символов")
    .max(100, "Имя слишком длинное"),
  email: z.string().min(1, "Введите email").email("Введите корректный email"),
  password: z
    .string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .max(128, "Пароль слишком длинный"),
});

export const otpEmailSchema = z.object({
  email: z.string().min(1, "Введите email").email("Введите корректный email"),
});

export const otpVerifySchema = z.object({
  email: z.string().email(),
  otp: z
    .string()
    .length(6, "Код должен содержать 6 цифр")
    .regex(/^\d+$/, "Код должен содержать только цифры"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Введите email").email("Введите корректный email"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Пароль должен быть не менее 8 символов")
      .max(128, "Пароль слишком длинный"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OtpEmailInput = z.infer<typeof otpEmailSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
