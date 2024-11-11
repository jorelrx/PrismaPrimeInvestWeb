// src/styles/FundDetailStyles.ts
import styled from 'styled-components';

export const DetailContainer = styled.div`
  margin: 0rem auto 2rem auto;
  padding: 0rem 2rem 2rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary.background.light};
  border-radius: 8px;
`;

export const DetailContainerCards = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.background.light};
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  box-flex: 3;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary.text.dark};
`;

export const SubTitle = styled.h2`
  font-size: 1.1em;
  color: ${({ theme }) => theme.colors.primary.text.dark};
  margin-bottom: 1.5rem;
`;

export const DetailCard = styled.div`
  margin: 0.3rem;
  padding: 0.5rem;
  width: 13rem;
  height: 8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.background.medium};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  display: block;
  color: ${({ theme }) => theme.colors.primary.text.Dark};
`;

export const DetailValue = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary.text.dark};
`;
