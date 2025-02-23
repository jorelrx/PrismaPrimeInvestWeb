import { BaseService } from "./BaseService";
import { FundReport } from "@/types/fund/FundReport";

class FundReportService extends BaseService<FundReport, null> {
    constructor() {
        super('/FundReport');
    }
}

export default FundReportService;
