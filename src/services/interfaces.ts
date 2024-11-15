// src/services/interfaces.ts

export interface IApiResponse<T> {
    id: string;
    status: number;
    response: T;
    message: string;
}

export interface IApiResponseError {
    id: string;
    status: number;
    response: unknown;
    message: string;
}
  
export interface IApiService<T> {
    getAll(): Promise<IApiResponse<T[]>>;
    getById(id: string): Promise<IApiResponse<T>>;
    create(data: T): Promise<IApiResponse<T>>;
    update(id: string, data: T): Promise<IApiResponse<T>>;
    delete(id: string): Promise<IApiResponse<null>>;
}
  