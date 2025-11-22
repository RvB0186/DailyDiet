import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';

const Container = styled.div`
  background: ${({ theme }) => theme.COLORS.GREEN_LIGHT};
  min-height: 100vh;
  display: flex;       /* Garante que os filhos se comportem bem */
  flex-direction: column;
`;

const Header = styled.header`
  padding: 2rem;
  text-align: center;
  position: relative;
  h1 { font-size: 2rem; color: ${({ theme }) => theme.COLORS.GRAY_700}; }
  p { color: ${({ theme }) => theme.COLORS.GRAY_600}; }
`;

const Content = styled.div`
  background: white;
  border-radius: 20px 20px 20px 20px;
  padding: 2rem;
  flex: 0; 
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  /* Centralização Horizontal */
  max-width: 700px;
  width: 100%;
  margin: 0 auto; 
`;

const Card = styled.div`
  background: ${({ bg }) => bg || '#EFF0F0'};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  
  h2 { font-size: 1.5rem; color: #1B1D1E; margin-bottom: 5px; }
  p { font-size: 0.9rem; color: #333638; }
`;

export function Metrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    api.get('/metrics').then(res => setMetrics(res.data));
  }, []);

  if (!metrics) return <div style={{padding: 20}}>Carregando...</div>;

  const percentage = metrics.totalMeals > 0 
    ? ((metrics.totalInDiet / metrics.totalMeals) * 100).toFixed(2) 
    : 0;

  return (
    <Container>
      <Header>
        <Link to="/" style={{position: 'absolute', left: 20, top: 25}}>
          <ArrowLeft size={24} color="#639339"/>
        </Link>
        <h1>{percentage}%</h1>
        <p>das refeições dentro da dieta</p>
      </Header>

      <Content>
        <h3 style={{textAlign: 'center', marginBottom: 10}}>Estatísticas gerais</h3>
        
        <Card>
          <h2>{metrics.bestSequence}</h2>
          <p>melhor sequência de pratos dentro da dieta</p>
        </Card>
        
        <Card>
          <h2>{metrics.totalMeals}</h2>
          <p>refeições registradas</p>
        </Card>

        <div style={{display: 'flex', gap: 10}}>
          <Card bg="#E5F0DB" style={{flex: 1}}>
             <h2>{metrics.totalInDiet}</h2>
             <p>dentro da dieta</p>
          </Card>
          <Card bg="#F4E6E7" style={{flex: 1}}>
             <h2>{metrics.totalOutDiet}</h2>
             <p>fora da dieta</p>
          </Card>
        </div>
      </Content>
    </Container>
  );
}