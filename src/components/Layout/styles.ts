import Link from 'next/link';
import styled from 'styled-components';

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    background-color: ${({ theme }) => theme.colors.layout.background.medium};
    color: ${({ theme }) => theme.colors.primary.text.light};
    flex-grow: 1;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px;
    border-color: ${({ theme }) => theme.colors.primary.background.medium};
    border-style: solid;

    > * {
        display: flex;
        align-items: center;
    }
`;

export const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem;
    color: white;

    &:hover {
        text-decoration: none;
    }
`;

export const Circle = styled.div`
    width: 60px;
    height: 60px;
    background-color: white;
    border-radius: 50%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.h1`
    font-size: 1rem;
    margin: 0 0 0 0.5em;
    color: ${({ theme }) => theme.colors.primary.text};
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    justify-content: right;

    a {
        color: ${({ theme }) => theme.colors.layout.text.medium};
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: bold;
        letter-spacing: .5px;
        transition: color 0.3s ease;

        &:hover {
            color: ${({ theme }) => theme.colors.primary.text.light};
            text-decoration: underline;
        }
    }
`;

export const Navbar = styled.nav`
    position: absolute;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    align-items: left;
    width: 18em;
    height: 100vh;
    padding: 1em 0em;
    background-color: ${({ theme }) => theme.colors.layout.background.medium};
    border-right: 1px solid;
    border-color: ${({ theme }) => theme.colors.primary.background.medium};
`;

export const NavItemContainer = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    list-style-type: none;
`;

export const NavItem = styled.li`
    width: 100%;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;

    a {
        width: 100%;
        color: ${({ theme }) => theme.colors.layout.text.medium};
        text-decoration: none;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: left;
        padding: 8px 15px;
        font-size: 15px;
        letter-spacing: .5px;
        border: 1px solid #ffffff00;

        &:hover {
            background-color: ${({ theme }) => theme.colors.layout.background.light};
        }
    }
`;

export const Main = styled.main`
    flex: 1;
    padding: 2rem;
    margin: 1em 2em 1em 20em;
    background-color: ${({ theme }) => theme.colors.primary.background.light};
    color: ${({ theme }) => theme.colors.primary.text.dark};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

export const Footer = styled.footer`
    text-align: center;
    padding: 1rem 0px;
    background-color: ${({ theme }) => theme.colors.primary.background.light};
    color: ${({ theme }) => theme.colors.primary.text.dark};
    font-size: 0.9rem;
    margin-top: 5em;
`;
