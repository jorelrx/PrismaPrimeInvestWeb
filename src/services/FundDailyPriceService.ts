import { FundDailyPrice } from "@/types/fund/FundDailyPrice";
import { BaseService } from "./BaseService";

class FundDailyPriceService extends BaseService<FundDailyPrice, null> {
    constructor() {
        super('/FundDailyPrice');
    }
}

export default FundDailyPriceService;
