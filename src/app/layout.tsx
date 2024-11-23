import './globals.css';
import { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { SidebarProvider } from '@/components/ui/sidebar';

import NotificationComponent from '@/components/Notification';
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
                <AuthProvider>
                    <NotificationProvider>
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
                        <NotificationComponent />
                    </NotificationProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
