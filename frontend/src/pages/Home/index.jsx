import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Plus, ChartBar } from 'phosphor-react';

const Container = styled.div`
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  img { width: 80px; } /* Logo fictícia */
`;

const Button = styled.button`
  background: ${({ theme }) => theme.COLORS.GRAY_600};
  color: white;
  border: 0;
  padding: 12px 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  
  &:hover { filter: brightness(0.9); }
`;

const PercentCard = styled(Link)`
  background: ${({ theme }) => theme.COLORS.GREEN_LIGHT};
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  margin-bottom: 2rem;

  h1 { font-size: 32px; color: ${({ theme }) => theme.COLORS.GRAY_700}; }
  span { color: ${({ theme }) => theme.COLORS.GRAY_600}; font-size: 14px; }
`;

const MealCard = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_300};
  margin-bottom: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 12px;
  
  strong { flex: 1; color: ${({ theme }) => theme.COLORS.GRAY_700}; }
  
  .status {
    width: 14px; 
    height: 14px; 
    border-radius: 50%;
    background: ${({ isOnDiet, theme }) => isOnDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
  }
`;

export function Home() {
  const [meals, setMeals] = useState([]);
  const [metrics, setMetrics] = useState({});

  async function loadData() {
    try {
      const [mealsRes, metricsRes] = await Promise.all([
        api.get('/meals'),
        api.get('/metrics')
      ]);
      setMeals(mealsRes.data);
      setMetrics(metricsRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    }
  }

  useEffect(() => { loadData(); }, []);

  const percentInDiet = metrics.totalMeals > 0 
    ? ((metrics.totalInDiet / metrics.totalMeals) * 100).toFixed(2) 
    : 0;

  return (
    <Container>
      <Header>
        <h2>Daily Diet</h2>
        <img src="https://github.com/rocketseat.png" style={{borderRadius: '50%'}} alt="Profile"/>
      </Header>

      <PercentCard to="/metrics">
        <h1>{percentInDiet}%</h1>
        <span>das refeições dentro da dieta</span>
        <ChartBar size={24} style={{marginTop: 10, color: '#639339'}}/>
      </PercentCard>

      <p style={{marginBottom: 10}}>Refeições</p>
      <Link to="/new" style={{textDecoration: 'none'}}>
        <Button style={{width: '100%', marginBottom: 20}}>
          <Plus size={18} /> Nova refeição
        </Button>
      </Link>

      {meals.map(meal => (
        <MealCard key={meal.id} isOnDiet={meal.isOnDiet}>
          <span>{new Date(meal.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          <div style={{height: 20, width: 1, background: '#ddd'}}></div>
          <strong>{meal.name}</strong>
          <div className="status"></div>
        </MealCard>
      ))}
    </Container>
  );
}