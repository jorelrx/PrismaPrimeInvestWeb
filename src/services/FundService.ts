import { Fund } from "@/types/fund/Fund";
import { BaseService } from "./BaseService";
import { IApiResponse } from "@/interfaces/IApiResponse";
import axiosInstance from "@/lib/axiosInstance";

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
}

export default FundService;
