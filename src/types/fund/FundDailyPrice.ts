export interface FundDailyPrice {
    id: string;
    name: string;
    date: Date;
    code: string;
    openPrice: number;
    closePrice: number;
    maxPrice: number;
    minPrice: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}
