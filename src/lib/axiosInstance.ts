import { IApiResponse } from "@/interfaces/IApiResponse";
import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";
import qs from "qs";

function createHttpClient(): AxiosInstance {
    const instance = axios.create({
        baseURL: `https://prisma-prime-invest-ep.azurewebsites.net/api`,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(
        (config) => {
            const cookies = parseCookies();
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
            }
            return Promise.reject<IApiResponse<string>>(error.response);
        }
    );

    return instance;
}

const axiosInstance = createHttpClient();

export default axiosInstance;
