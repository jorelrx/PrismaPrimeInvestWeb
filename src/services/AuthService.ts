import axiosInstance from "@/lib/axiosInstance";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { ILoginResponse } from "@/types/auth/ILoginResponse";
import { IUser } from "@/types/user/IUser";

export class AuthService {
    private endpoint = "/auth";

    async login(email: string, password: string): Promise<IApiResponse<ILoginResponse>> {
        const response = await axiosInstance.post<IApiResponse<ILoginResponse>>(
        `${this.endpoint}/login`,
        { email, password }
        );
        return response.data;
    }

    async me(): Promise<IApiResponse<IUser>> {
        const response = await axiosInstance.get<IApiResponse<IUser>>(`${this.endpoint}/me`);
        return response.data;
    }
}
