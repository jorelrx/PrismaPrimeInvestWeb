import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardInfoProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: 'purple' | 'blue' | 'emerald' | 'amber' | 'red' | 'green' | 'indigo' | 'pink';
}

const colorVariants = {
    purple: 'from-purple-500 to-purple-700 text-purple-50',
    blue: 'from-blue-500 to-blue-700 text-blue-50',
    emerald: 'from-emerald-500 to-emerald-700 text-emerald-50',
    amber: 'from-amber-500 to-amber-700 text-amber-50',
    red: 'from-red-500 to-red-700 text-red-50',
    green: 'from-green-500 to-green-700 text-green-50',
    indigo: 'from-indigo-500 to-indigo-700 text-indigo-50',
    pink: 'from-pink-500 to-pink-700 text-pink-50',
};

export function CardInfo({ title, value, icon, color } : CardInfoProps ) {
    return (
        <Card className={`w-full shadow-md bg-gradient-to-br ${colorVariants[color]}`}>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-lg">
                {value}
            </CardContent>
        </Card>
    )
}