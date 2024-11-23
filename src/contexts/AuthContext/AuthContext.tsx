"use client";

import React, { createContext, useReducer, useContext, useEffect, useCallback } from "react";
import { AuthState, initialState, AuthAction, AuthContextProps } from "./AuthTypes";
import { authReducer } from "./AuthReducer";
import { AuthService } from "../../services/AuthService";
import { setCookie, destroyCookie } from "nookies";

const authService = new AuthService();

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(authReducer, initialState);

    const login = useCallback(async (email: string, password: string) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const data = await authService.login(email, password);
            if (data.status !== 200) {
                dispatch({ type: "LOGIN_FAILURE", payload: data?.message || "Erro ao fazer login" });
                return;
            }

            setCookie(null, "token", data.response.token);
            dispatch({ type: "LOGIN_SUCCESS", payload: data.response.user });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            dispatch({ type: "LOGIN_FAILURE", payload: error?.data.message || "Erro ao fazer login" });
        }
    }, []);

    const logout = useCallback(() => {
        dispatch({ type: "LOGOUT" });
        destroyCookie(null, "token");
    }, []);

    const loadUser = useCallback(async () => {
        try {
            const response = await authService.me();
            dispatch({ type: "LOAD_USER_SUCCESS", payload: response.response });
        } catch {
            dispatch({ type: "LOAD_USER_FAILURE" });
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
};
