import axiosInstance from "@/lib/axiosInstance";
import { IApiResponse } from "@/interfaces/IApiResponse";
import { IPagedResult } from "@/interfaces/IPagedResult";

export class BaseService<T, Y> {
    constructor(private readonly endpoint: string) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getAll(filters?: Record<string, any>): Promise<IApiResponse<IPagedResult<T>>> {
        const result = await axiosInstance.get<IApiResponse<IPagedResult<T>>>(this.endpoint, {
            params: filters,
        });
        return result.data;
    }
  
    async getById(id: string): Promise<IApiResponse<T>> {
      const response = await axiosInstance.get<IApiResponse<T>>(`${this.endpoint}/${id}`);
      return response.data;
    }
  
    async create(data: Y): Promise<IApiResponse<string>> {
      const response = await axiosInstance.post<IApiResponse<string>>(this.endpoint, data);
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
