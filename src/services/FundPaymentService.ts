import { BaseService } from "./BaseService";
import { FundPayment } from "@/types/fund/FundPayment";

class FundPaymentService extends BaseService<FundPayment, null> {
    constructor() {
        super('/FundPayment');
    }
}

export default FundPaymentService;
