"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PerformanceChart({ data }: { data: any[] }) {
    return (
        <Card>
            <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="closePrice" stroke="#8884d8" name="Preço de Fechamento" />
                        <Line type="monotone" dataKey="openPrice" stroke="#82ca9d" name="Preço de Abertura" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

