// src/components/Layout.tsx
import React from 'react';
import { LayoutProps } from './types';
import { Circle, Footer, Header, LogoLink, Main, Navbar, NavItem, Profile, Title } from './styles';
import Link from 'next/link';
import Image from 'next/image';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header>
        <LogoLink href="/">
          <Circle>
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </Circle>
          <Title>Prisma Prime Invest</Title>
        </LogoLink>
        <Navbar>
          <NavItem>
            <Link href="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link href="/users">Usuários</Link>
          </NavItem>
          <NavItem>
            <Link href="/funds">Fundos</Link>
          </NavItem>
        </Navbar>
        <Profile>
          <span>Olá, Joel!</span>
          <Circle>
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
          </Circle>
        </Profile>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>&copy; {new Date().getFullYear()} Meu Projeto</p>
      </Footer>
    </>
  );
};

export default Layout;
