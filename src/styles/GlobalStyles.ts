// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html, body {
        width: 100vw;
    }
    body {
        width: 100vw;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        background: ${({ theme }) => `linear-gradient(150deg, ${theme.colors.primary.background.dark}, ${theme.colors.primary.background.medium})`};
        color: ${({ theme }) => theme.colors.primary.text.light};
        min-height: 100vh;
    }
`;
