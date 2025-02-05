export interface IWallet {
    id: string;
    name: string;
    createdByUserName: string;
    isPublic: boolean;
    totalInvested: number;
    totalCurrentValue: number;
}
