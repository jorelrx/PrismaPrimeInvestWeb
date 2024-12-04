'use server'

import { RegisterInput, registerSchema } from "../validations/auth"


export async function register(values: RegisterInput) {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Aqui você faria a chamada para o seu back-end
  // Por enquanto, vamos simular um erro de e-mail já existente
  if (validatedFields.data.email === "teste@exemplo.com") {
    return {
      errors: {
        email: ["Este e-mail já está em uso"],
      },
    }
  }

  // Se tudo estiver ok, retorne um sucesso
  return { success: true }
}
