import { Fund } from "@/types/fund/Fund";
import { BaseService } from "./BaseService";
import { IApiResponse } from "@/interfaces/IApiResponse";
import axiosInstance from "@/lib/axiosInstance";
import { MonthlyInvestmentReport } from "@/types/fund/MonthlyInvestmentReport";

class FundService extends BaseService<Fund> {
    constructor() {
        super('/Fund');
    }

    async getByCodeAsync(code: string): Promise<Fund> {
        const result = await axiosInstance.get<IApiResponse<Fund[]>>("/Fund", {
            params: { code: code },
        });

        return result.data.response[0];
    }

    async getAnalyzeInvestment(code: string, baseAmount: number, purchaseDay: string): Promise<MonthlyInvestmentReport[]> {
        const result = await axiosInstance.get<IApiResponse<MonthlyInvestmentReport[]>>(`/Fund/analyze-investment/${code}`, {
            params: { baseAmount: baseAmount, purchaseDay: purchaseDay },
        });

        return result.data.response;
    }
}

export default FundService;
