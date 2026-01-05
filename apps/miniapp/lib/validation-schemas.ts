import { z } from "zod"

// Checkout form validation schema
export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Введите ФИО")
    .refine((value) => value.trim().split(" ").length >= 2, {
      message: "Введите полное ФИО (минимум имя и фамилия)",
    }),
  phone: z
    .string()
    .min(1, "Введите номер телефона")
    .min(10, "Номер телефона слишком короткий")
    .max(18, "Номер телефона слишком длинный"),
  pickupPointId: z.number({
    required_error: "Выберите пункт выдачи",
  }),
})

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>

// Custom order form validation schema
export const customOrderFormSchema = z.object({
  woodType: z.enum(["birch", "pine", "oak"], {
    required_error: "Выберите тип древесины",
  }),
  diameter: z.number().min(10).max(100),
  thickness: z.number().min(2).max(10),
  quantity: z.number().min(1).max(50),
  comment: z.string().optional(),
})

export type CustomOrderFormData = z.infer<typeof customOrderFormSchema>
