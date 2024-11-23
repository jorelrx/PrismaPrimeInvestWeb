import { BaseService } from "./BaseService";
import { FundPayment } from "@/types/fund/FundPayment";

class FundPaymentService extends BaseService<FundPayment> {
    constructor() {
        super('/FundPayment');
    }
}

export default FundPaymentService;
