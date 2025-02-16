import './globals.css';
import { Metadata } from 'next';
import { SidebarProvider } from '@/components/ui/sidebar';

import AppSidebar from '@/components/AppSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: {
      template: "%s | Prisma Prime Invest",
      default: "Prisma Prime Invest",
    },
    description: "Sistema de gestão de fundos de investimento",
    keywords: "Prisma Prime Invest, gestão de fundos, investimento, gestão de fundos de investimento",
    creator: "Joel Victor",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body className="bg-blue-50">
                <SidebarProvider>
                    <AppSidebar />
                    <div className="w-screen">
                            <Header></Header>
                            <main className="flex-1">
                                {children}
                            </main>
                            <Footer />
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}
