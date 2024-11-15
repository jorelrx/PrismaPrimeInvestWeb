// src/pages/funds/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FundService from '@/services/FundService';
import { Fund } from '@/types/fund';
import {
  DetailContainer,
  DetailContainerCards,
  Title,
  SubTitle,
  DetailCard,
  DetailLabel,
  DetailValue,
} from '../../../styles/funds/details';

const fundService = new FundService();

const FundDetailPage = () => {
  const [fund, setFund] = useState<Fund | null>(null);
  const router = useRouter();
  const { id } = router.query;
  
  useEffect(() => {
    if (id) {
      const fetchFundDetails = async () => {
        try {
          const fundDetails = await fundService.getById(id as string);
          console.log("Details: " + fundDetails.response)
          setFund(fundDetails.response);
        } catch (error) {
          console.error("Erro ao buscar detalhes do fundo:", error);
        }
      };
      fetchFundDetails();
    }
  }, [id]);

  if (!fund) return <p>Carregando...</p>;

  return (
    <DetailContainer>
      <Title>{fund.code}</Title>
      <SubTitle>{fund.name}</SubTitle>
      <DetailContainerCards>
        <DetailCard>
          <DetailLabel>Preço:</DetailLabel>
          <DetailValue>{fund.price}</DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Preço máximo:</DetailLabel>
          <DetailValue>{fund.maxPrice}</DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Preço minimo:</DetailLabel>
          <DetailValue>{fund.minPrice}</DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Tipo:</DetailLabel>
          <DetailValue>{fund.type}</DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Melhor Dia para Comprar:</DetailLabel>
          <DetailValue>{fund.bestBuyDay}</DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Melhor preço para comprar:</DetailLabel>
          <DetailValue>{fund.bestBuyDayPrice}</DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Data de Criação:</DetailLabel>
          <DetailValue>{new Date(fund.createdAt).toLocaleDateString()}</DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailLabel>Última Atualização:</DetailLabel>
          <DetailValue>{new Date(fund.updatedAt).toLocaleDateString()}</DetailValue>
        </DetailCard>
      </DetailContainerCards>
    </DetailContainer>
  );
};

export default FundDetailPage;
