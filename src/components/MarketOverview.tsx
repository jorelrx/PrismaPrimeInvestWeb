import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const marketData = [
    { index: "IBOVESPA", value: 118000, change: 1.5 },
    { index: "S&P 500", value: 4700, change: -0.3 },
    { index: "NASDAQ", value: 16000, change: 0.8 },
    { index: "IFIX", value: 3000, change: 0 },
];

export function MarketOverview() {
    return (
        <div className="space-y-4">
            {marketData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{item.index}</span>
                    <div className="flex items-center gap-2">
                        <span>{item.value.toLocaleString()}</span>
                        <span className={`flex items-center ${
                            item.change > 0 ? 'text-green-600' : 
                            item.change < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                            {item.change > 0 ? <ArrowUpRight className="h-4 w-4" /> :
                             item.change < 0 ? <ArrowDownRight className="h-4 w-4" /> :
                             <Minus className="h-4 w-4
" />}
                            {Math.abs(item.change)}%
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

