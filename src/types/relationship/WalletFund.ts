import { Fund } from "../fund/Fund";

export interface WalletFund {
    id: string;
    fund: Fund;
}

export interface CreateWalletFund {
    code: string;
}
  