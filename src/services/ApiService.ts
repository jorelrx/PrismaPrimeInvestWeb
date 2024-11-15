// src/services/ApiService.ts
import axiosInstance from './axiosInstance';
import { IApiResponse, IApiService } from './interfaces';

export class ApiService<T> implements IApiService<T> {
  constructor(private readonly endpoint: string) {}

  async getAll(): Promise<IApiResponse<T[]>> {
    const result = await axiosInstance.get<IApiResponse<T[]>>(this.endpoint);
    return result.data;
  }

  async getById(id: string): Promise<IApiResponse<T>> {
    const response = await axiosInstance.get<IApiResponse<T>>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data: T): Promise<IApiResponse<T>> {
    const response = await axiosInstance.post<IApiResponse<T>>(this.endpoint, data);
    return response.data;
  }

  async update(id: string, data: Partial<T>): Promise<IApiResponse<T>> {
    const response = await axiosInstance.put<IApiResponse<T>>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<IApiResponse<null>> {
    const response = await axiosInstance.delete<IApiResponse<null>>(`${this.endpoint}/${id}`);
    return response.data;
  }
}
