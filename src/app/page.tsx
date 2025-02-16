import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Prisma Prime Invest - Gerencie sua Carteira de Investimentos",
    description: "Acompanhe seus investimentos em tempo real com o Prisma Prime Invest. Veja cotações, rendimentos e insights do mercado.",
    keywords: "Prisma Prime Invest, gestão de fundos, investimento, gestão de fundos de investimento",
    creator: "Joel Victor",
}

export default function Home() {
    console.log("Home");
    return (
        <h1>Dashboard</h1>
    );
}

