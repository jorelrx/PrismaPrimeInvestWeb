import { User } from '@/types/user';
import axiosInstance from './axiosInstance';
import { IApiResponse } from './interfaces';

export interface LoginResponse {
    token: string;
    user: User;
}

export class AuthService {
    async login(email: string, password: string): Promise<IApiResponse<LoginResponse>> {
        const response = await axiosInstance.post<IApiResponse<LoginResponse>>('/auth/login', { email, password });
        return response.data;
    }
}