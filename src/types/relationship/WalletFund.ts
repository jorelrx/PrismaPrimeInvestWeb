export interface WalletFund {
    id: string;
    purchaseDate: Date;
    purchasePrice: number;
    quantity: number;
    totalAmount: number;
    fundName: string;
}

export interface CreateWalletFund {
    code: string;
}
  