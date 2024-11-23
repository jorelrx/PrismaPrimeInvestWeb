import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next"; // Biblioteca para manipular cookies no lado do cliente.

function createHttpClient(): AxiosInstance {
    const isServer = typeof window === "undefined";

    const instance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Adicionar interceptors para incluir o token
    instance.interceptors.request.use(async (config) => {
        const token = isServer 
            ? (await cookies()).get("authToken")?.value // No servidor, usa next/headers
            : getCookie("authToken"); // No cliente, usa cookies-next

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            // Trate erros globais, como redirecionar para login em 401
            if (error.response?.status === 401) {
                if (!isServer) {
                    window.location.href = "/login";
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
}

const httpClient = createHttpClient();
export default httpClient;
