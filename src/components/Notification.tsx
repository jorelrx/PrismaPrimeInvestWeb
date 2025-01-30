"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Helper opcional para combinar classes do Tailwind
import { useNotification } from "@/contexts/NotificationContext";
import { X } from "lucide-react"


const NotificationComponent: React.FC = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-4">
            {notifications.map(({ id, type, message }) => (
                <div
                    key={id}
                    className={cn(
                        "px-2 py-3 rounded-md shadow-md transition-all duration-300 flex justify-between",
                        type === "success" && "bg-green-500 text-white",
                        type === "error" && "bg-red-500 text-white",
                        type === "info" && "bg-blue-500 text-white",
                        type === "warning" && "bg-yellow-500 text-black"
                    )}
                >
                    <p className="px-3">{message}</p>
                    <button onClick={() => removeNotification(id)}><X /></button>
                </div>
            ))}
        </div>
    );
};

export default NotificationComponent;
