"use client";

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
    const { addNotification } = useNotification();
    const { login, error, loading } = useAuth();
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
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Digite seu e-mail"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Digite sua senha"
                    required
                />
            </div>
            <button
                type="submit"
                className={`w-full px-4 py-2 text-white rounded-md ${
                    loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
            >
                {loading ? "Entrando..." : "Entrar"}
            </button>
        </form>
    );
};

export default LoginForm;
