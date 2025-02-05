import { BaseService } from "./BaseService";
import axiosInstance from "@/lib/axiosInstance";

import { IWallet, WalletInvestmentAnalysisDto } from "@/types/user/IWallet";
import { CreateWalletDto } from "@/dtos/CreateWalletDto";
import { IApiResponse } from "@/interfaces/IApiResponse";

class WalletService extends BaseService<IWallet, CreateWalletDto> {
    constructor() {
        super("/wallet");
    }

    async getAnalyzeInvestment(walletId: string): Promise<WalletInvestmentAnalysisDto[]> {
        const result = await axiosInstance.get<IApiResponse<WalletInvestmentAnalysisDto[]>>(`/wallet/${walletId}/investment-analysis`);

        return result.data.response;
    }

    async purchaseAsset(walletId: string, assetId: string, quantity: number, price: number, date: Date): Promise<IApiResponse<string>> {
        const result = await axiosInstance.post(`/wallet/fund/purchase`, { walletId, fundId: assetId, quantity, purchasePrice: price, purchaseDate: date });
        console.log("Result puschaseAsset: ", result.data)
        return result.data;
    }
}

export default WalletService;
