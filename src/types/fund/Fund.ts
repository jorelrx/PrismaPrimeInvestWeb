export type AssetCategory = "stocks" | "bonds" | "realestate" | "crypto"

export interface Fund {
    id: string;
    name: string;
    category: AssetCategory
    pvp: number
    dividendYield: number
    cnpj: string;
    code: string;
    qtyQuotasIssued: number;
    netAssetValue: number;
    totalShares: number;
    netAssetValuePerShare: number;
    price: number;
    maxPrice: number;
    minPrice: number;
    type: string;
    bestBuyDayPrice: number;
    bestBuyDay: string;
    createdAt: Date;
    updatedAt: string;
}
  