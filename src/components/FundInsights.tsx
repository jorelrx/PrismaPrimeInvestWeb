import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const insights = [
    { fund: "TECH11", title: "Crescimento Acelerado", description: "O fundo TECH11 mostrou um crescimento excepcional no último trimestre, impulsionado pelo boom do setor de IA.", trend: "up" },
    { fund: "FINC22", title: "Desempenho Estável", description: "FINC22 mantém retornos consistentes, oferecendo um equilíbrio entre segurança e rendimento.", trend: "neutral" },
    { fund: "ENER33", title: "Alerta de Volatilidade", description: "O fundo ENER33 enfrenta desafios devido à instabilidade no mercado de energia. Monitoramento próximo recomendado.", trend: "down" },
];

export function FundInsights() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {insight.fund}
                            <Badge variant={insight.trend === "up" ? "default" : insight.trend === "down" ? "destructive" : "secondary"}>
                                {insight.trend === "up" ? <TrendingUp className="h-4 w-4" /> : 
                                 insight.trend === "down" ? <TrendingDown className="h-4 w-4" /> : 
                                 <AlertTriangle className="h-4 w-4" />}
                            </Badge>
                        </CardTitle>
                        <CardDescription>{insight.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

