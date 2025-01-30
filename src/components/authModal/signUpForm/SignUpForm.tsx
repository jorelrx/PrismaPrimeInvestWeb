"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserData, registerSchema } from "./validations/createUserValidations";
import UserService from "@/services/UserService";

interface SignUpFormProps {
    onToggle: () => void;
}

const userService = new UserService();

export default function SignUpForm({ onToggle }: SignUpFormProps) {
    const {
        register: formRegister,
        handleSubmit,
        formState: { 
            errors, 
            isSubmitting 
        },
    } = useForm<CreateUserData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (values: CreateUserData) => {
        await userService.create(values);
    };

    return (
        <div className="p-8 h-full w-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4 rounded-md shadow-sm">
                    {(["firstName", "lastName", "email", "password", "passwordConfirm"] as const).map((field) => (
                        <div key={field}>
                            <Label htmlFor={field}>
                                {field === "firstName"
                                ? "Nome"
                                : field === "lastName"
                                ? "Sobrenome"
                                : field === "email"
                                ? "E-mail"
                                : field === "password"
                                ? "Senha"
                                : "Confirme a senha"}
                            </Label>
                            <Input
                                id={field}
                                type={field.startsWith("password") ? "password" : "text"}
                                {...formRegister(field)}
                            />
                            {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]?.message}</p>}
                        </div>
                    ))}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Registrando..." : "Registrar"}
                </Button>
            </form>
            <p className="mt-4 text-center">
                Already have an account?{" "}
                <Button variant="link" onClick={onToggle} className="p-0">
                    Sign In
                </Button>
            </p>
        </div>
    );
}
