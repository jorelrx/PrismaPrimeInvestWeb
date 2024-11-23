import { format } from "date-fns"

interface TooltipPayload {
    value: number;
}
  
interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string | number; // Dependendo do formato do rótulo
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length && label) {
        return (
            <div className="rounded-lg border bg-background p-2 pr-7 shadow-sm">
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                        </span>
                        <span className="font-bold text-muted-foreground">
                            {format(new Date(label), "dd MMM yyyy")}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Price
                        </span>
                        <span className="font-bold">
                            R$ {payload[0].value.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return null;
}