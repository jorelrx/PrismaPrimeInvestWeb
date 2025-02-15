export interface IWallet {
    id: string;
    name: string;
    createdByUserName: string;
    isPublic: boolean;
    totalInvested: number;
    totalCurrentValue: number;
}

export interface WalletInvestmentAnalysisDto {
    date: Date;
    investedInMonth: number;
    totalCurrentValue: number;
    totalGrossInvested: number;
    totalCurrentValueWithDividends: number;
    totalGrossInvestedWithDividends: number;
    totalDividends: number;
    monthlyEarnings: number;
}
