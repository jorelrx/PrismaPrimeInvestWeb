import { ApiService } from "./ApiService";
import { Fund } from "@/types/fund";

class FundService extends ApiService<Fund> {
  constructor() {
    super('/fund');
  }
}

export default FundService;