"use client";

import React from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-[76vh]">
        <div className="w-full max-w-md p-6 bg-gray-100 shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <LoginForm />
        </div>
        </main>
    );
}
