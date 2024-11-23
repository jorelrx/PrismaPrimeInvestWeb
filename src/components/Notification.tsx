"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Helper opcional para combinar classes do Tailwind
import { useNotification } from "@/contexts/NotificationContext";


const NotificationComponent: React.FC = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-4">
            {notifications.map(({ id, type, message }) => (
                <div
                    key={id}
                    className={cn(
                    "px-4 py-2 rounded-md shadow-md transition-all duration-300 flex",
                    type === "success" && "bg-green-500 text-white",
                    type === "error" && "bg-red-500 text-white",
                    type === "info" && "bg-blue-500 text-white",
                    type === "warning" && "bg-yellow-500 text-black"
                    )}
                >
                    {message}
                    <button onClick={() => removeNotification(id)}>×</button>
                </div>
            ))}
        </div>
    );
};

export default NotificationComponent;
