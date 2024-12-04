'use client'

import { useState } from "react"
import { useFormik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RegisterInput, registerSchema } from "./validations/auth"
import { register } from "./actions/auth"

export default function RegisterPage() {
  const [serverErrors, setServerErrors] = useState<Partial<Record<keyof RegisterInput, string[]>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const formik = useFormik<RegisterInput>({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setIsSubmitting(true)
      setServerErrors({})
      const result = await register(values)
      setIsSubmitting(false)

      if (result.errors) {
        setServerErrors(result.errors)
      } else if (result.success) {
        setRegistrationSuccess(true)
      }
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Registre-se</h2>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {(["firstName", "lastName", "username", "email", "password", "confirmPassword"] as const).map((field) => (
              <div key={field}>
                <Label htmlFor={field}>{field === "firstName" ? "Nome" : 
                                        field === "lastName" ? "Sobrenome" : 
                                        field === "username" ? "Nome de usuário" : 
                                        field === "email" ? "E-mail" : 
                                        field === "password" ? "Senha" : 
                                        "Confirme a senha"}
                </Label>
                <Input
                  id={field}
                  name={field}
                  type={field.includes("password") ? "password" : "text"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field]}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors[field] as string}</p>
                )}
                {serverErrors[field] && (
                  <p className="mt-1 text-sm text-red-600">{serverErrors[field]![0]}</p>
                )}
              </div>
            ))}
          </div>

          {registrationSuccess && (
            <h1>Oii</h1>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrar"}
          </Button>
        </form>
      </div>
    </div>
  )
}

