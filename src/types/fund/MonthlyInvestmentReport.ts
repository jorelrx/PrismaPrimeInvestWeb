export interface MonthlyInvestmentReport
{
    date: string
    totalInvestmentWithoutDividends: number
    totalInvestmentWithDividends: number
    fundPriceOnPurchaseDay: number
    sharesPurchasedThisMonth: number
    totalSharesPurchased: number
    totalAvailableForInvestment: number
    dividendsThisMonth: number
    totalDividends: number
    portfolioValueAtEndOfMonth: number
}