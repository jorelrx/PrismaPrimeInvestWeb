export interface IPagedResult<T> {
    items: T[];
    totalItems: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
