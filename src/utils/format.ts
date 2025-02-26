export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
        notation: value >= 1000000 ? "compact" : "standard",
        compactDisplay: "short",
    }).format(value)
}
  
export const formatPercent = (value: number | undefined) => {
    return `${value ? value.toFixed(1) : "0"}%`
}
  
export const formatPVP = (value: number) => {
    return value.toFixed(2)
}
