import { BaseService } from "./BaseService";
import { FundFavorite, CreateFundFavorite } from "@/types/relationship/FundFavorite";

class FundFavoriteService extends BaseService<FundFavorite, CreateFundFavorite> {
  constructor() {
    super("/fundFavorite");
  }
}

export default FundFavoriteService;
