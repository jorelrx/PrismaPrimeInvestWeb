// src/services/interfaces.ts

export interface IApiResponse<T> {
    id: string;
    statusCode: number;
    response: T;
    message: string;
}
  
  // Define a interface com as operações CRUD
  export interface IApiService<T> {
    getAll(): Promise<IApiResponse<T[]>>;
    getById(id: string): Promise<IApiResponse<T>>;
    create(data: T): Promise<IApiResponse<T>>;
    update(id: string, data: T): Promise<IApiResponse<T>>;
    delete(id: string): Promise<IApiResponse<null>>;
  }
  