import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary.background.medium};
  color: ${({ theme }) => theme.colors.primary.text};
`;

export const Circle = styled.div`
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;   /* arredondamento completo */
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoLink = styled(Link)`
display: flex;
align-items: center;
text-decoration: none;
color: white;
flex: 0 0 33.3333%;

&:hover {
  text-decoration: none;
}
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-around;
  padding: 0 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.background.medium};
  color: ${({ theme }) => theme.colors.primary.text.light};
  flex-grow: 1; /* Permite que o Header ocupe o espaço disponível */

  /* Para garantir que os filhos ocupem espaço igualmente */
  > * {
    flex-grow: 1; /* Cada filho irá crescer igualmente */
    display: flex; /* Para garantir que o conteúdo interno também seja flexível */
    align-items: center; /* Alinha os itens verticalmente dentro de cada filho */
  }

  /* Ajuste as propriedades se necessário para o comportamento desejado */
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin: 0 0 0 0.5em;
  color: ${({ theme }) => theme.colors.primary.text};
`;

export const Navbar = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex: 0 0 33.3333%;
`;

export const NavItem = styled.div`
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  justify-content: right;
  flex: 0 0 33.3333%;
`;

export const Main = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  min-width: 60%;
  margin: 1em auto;
  background-color: ${({ theme }) => theme.colors.primary.background.light};
  color: ${({ theme }) => theme.colors.primary.text.dark};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary.background.medium};
  color: ${({ theme }) => theme.colors.primary.text.light};
  font-size: 0.9rem;
`;
