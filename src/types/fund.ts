// src/types/fund.ts
export interface Fund {
    id: string;
    name: string;
    code: string;
    price: number;
    maxPrice: number;
    minPrice: number;
    type: string;
    bestBuyDayPrice: number;
    bestBuyDay: string;
    createdAt: Date;
    updatedAt: Date;
}
  