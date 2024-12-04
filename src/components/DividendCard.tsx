import { CalendarDays } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DividendCardProps {
    title: string
    amount: string | null
    returnPercentage: string | null
    basePrice: string | null
    baseDate: string | null
    paymentDate: string | null
    layoutCard?: 'last' | 'next' | null
    className?: string
}

export function DividendCard({
    title,
    amount,
    returnPercentage,
    basePrice,
    baseDate,
    paymentDate,
    layoutCard = null,
    className = "",
}: DividendCardProps) {
    const bgColor = layoutCard === 'next' ? 'bg-blue-500' : 'bg-blue-900'
    
    return (
        <Card className={`w-full max-w-sm ${bgColor} text-white ${className}`}>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                    <CalendarDays className="h-5 w-5" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="text-3xl font-bold">
                    R$ {amount || "-"}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium">RENDIMENTO</p>
                        <p className="text-lg">{returnPercentage ? `${returnPercentage}%` : "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">COTAÇÃO BASE</p>
                        <p className="text-lg">R$ {basePrice || "-"}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium">DATA BASE</p>
                        <p className="text-lg">{baseDate || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">DATA PAGAMENTO</p>
                        <p className="text-lg">{paymentDate || "-"}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

