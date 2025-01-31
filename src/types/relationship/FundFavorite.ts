import { Fund } from "../fund/Fund";

export interface FundFavorite {
    id: string;
    fund: Fund;
}

export interface CreateFundFavorite {
    code: string;
}
  