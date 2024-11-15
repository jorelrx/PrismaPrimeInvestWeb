// src/contexts/AuthContext.tsx
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { AuthService } from '@/services/AuthService';
import axiosInstance from '@/services/axiosInstance';
import { User } from '@/types/user';

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const authService = new AuthService();

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
    const router = useRouter();

    useEffect(() => {
        const token = nookies.get(null).authToken;
        if (token) {
            // api.get('/profile')
            //     .then(response => setUser(response.data))
            //     .catch(() => logout()); // Se falhar, deslogar
            console.log('online!')
        }
    }, []);

    async function login(email: string, password: string) {
        try {
            const data = await authService.login(email, password)
            console.log("data login: ", data)
            const { token, user } = data.response;
            nookies.set(null, 'authToken', token, { maxAge: 24 * 60 * 60, path: '/' }); // 1 dia
            setUser(user);
            axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            console.log('login feito com sucesso!')
            const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin'); 
            router.push(redirectUrl); 
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    }

    function logout() {
        nookies.destroy(null, 'authToken');
        setUser(null);
        router.push('/login');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
