import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter ao menos 3 caracteres.")
    .max(60, "O nome pode ter no máximo 60 caracteres."),
  email: z.string().email("Informe um e-mail válido."),
  password: z
    .string()
    .min(8, "A senha deve ter ao menos 8 caracteres.")
    .max(128, "A senha pode ter no máximo 128 caracteres.")
    .regex(/[A-Z]/, "A senha precisa de ao menos 1 letra maiúscula.")
    .regex(/[a-z]/, "A senha precisa de ao menos 1 letra minúscula.")
    .regex(/[0-9]/, "A senha precisa de ao menos 1 número."),
});

export type FormData = z.infer<typeof CreateUserSchema>;