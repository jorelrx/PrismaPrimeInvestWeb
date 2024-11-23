import { IApiResponse } from "@/interfaces/IApiResponse";
import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";
import { redirect } from "next/navigation";

function createHttpClient(): AxiosInstance {
    const instance = axios.create({
        baseURL: `https://prisma-prime-invest-ep.azurewebsites.net/api`,
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(
        (config) => {
            // Obtém o token usando `nookies`
            const cookies = parseCookies(); // Funciona tanto no cliente quanto no servidor
            const token = cookies.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error.response)
    );

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.log("Não autorizado. Redirecionar para login.");
                redirect("/login");
            }
            return Promise.reject<IApiResponse<string>>(error.response);
        }
    );

    return instance;
}

const axiosInstance = createHttpClient();

export default axiosInstance;
