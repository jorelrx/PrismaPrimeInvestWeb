import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInForm() {
    const { login, error } = useAuth();
    const { closeModal, openModal } = useAuthModal();
    const { addNotification } = useNotification();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            addNotification("info", "Fazendo login!");
            
            await login(email, password);
            
            if (!error) {
                addNotification("success", "Login realizado com sucesso!");
                closeModal()
                router.push("/");
            }
            else {
                addNotification("error", error);
            }
        }
        catch (err) {
            addNotification("error", "Credenciais inválidas.");
            console.error("Erro ao fazer login:", err);
        }
    };

    return (
        <div className="p-8 h-full w-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">
                    Sign In
                </Button>
            </form>
            <p className="mt-4 text-center">
                Don&apos;t have an account?{" "}
                <Button variant="link" onClick={() => openModal(false)} className="p-0">
                    Sign Up
                </Button>
            </p>
        </div>
    )
}

