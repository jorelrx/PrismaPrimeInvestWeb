// src/components/Layout.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useAuth } from '@/contexts/AuthContext';
import { LayoutProps } from './types';
import { 
    Circle, 
    Footer, Header, 
    LogoLink, 
    Main, 
    Navbar, 
    NavItem, 
    NavItemContainer, 
    Profile, 
    Title 
} from './styles';

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user } = useAuth();
    return (
        <>
        <Header>
            <LogoLink href="/">
                <Circle>
                    <Image src="/logo.png" alt="Logo" width={80} height={80} />
                </Circle>
                <Title>
                    Prisma Prime Invest
                </Title>
            </LogoLink>
            <Profile>
                {user ? (
                    <>
                        <span>Olá, {user?.firstName}!</span>
                        <Circle>
                            <Image src="/logo.png" alt="Logo" width={50} height={50} />
                        </Circle>
                    </>
                ) : (
                    <Link href="/login">
                        <p>Entrar</p>
                    </Link>
                )}
            </Profile>
        </Header>
        <Navbar>
            <NavItemContainer>
                <NavItem>
                    <Link href="/">Home</Link>
                </NavItem>
                
                {user ? (
                        <>
                            <NavItem>
                                <Link href="/profile">Perfil</Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/users">Usuários</Link>
                            </NavItem>
                        </>
                    ) : null
                }

                <NavItem>
                    <Link href="/funds">Fundos</Link>
                </NavItem>
            </NavItemContainer>
        </Navbar>
        <Main>{children}</Main>
        <Footer>
            <p>&copy; {new Date().getFullYear()} Meu Projeto</p>
        </Footer>
        </>
    );
};

export default Layout;
