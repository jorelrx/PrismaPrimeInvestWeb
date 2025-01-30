"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { initialState, AuthModalContextProps } from "./AuthModalTypes";
import { authModalReducer } from "./AuthModalReducer";

const AuthModalContext = createContext<AuthModalContextProps | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authModalReducer, initialState);

    const openModal = (isSignIn: boolean) => dispatch({ type: "OPEN_MODAL", isSignIn });
    const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

    return (
        <AuthModalContext.Provider value={{ ...state, openModal, closeModal }}>
            {children}
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error("useAuthModal must be used within an AuthModalProvider");
    }

    return context;
}

