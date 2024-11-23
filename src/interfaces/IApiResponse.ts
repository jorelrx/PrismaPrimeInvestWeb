export interface IApiResponse<T> {
    id: string;
    status: number;
    response: T;
    message: string;
}
