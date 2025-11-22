import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, ChartBar, SignOut } from 'phosphor-react'; // Adicionado SignOut
import { Footer } from '../../components/Footer'; // Importando o Footer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garante altura mínima para o footer ir pro final */
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

const Content = styled.div`
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
  flex: 1; /* Faz o conteúdo ocupar o espaço disponível empurrando o footer */
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  .user-info {
    display: flex;
    flex-direction: column;
  }

  .profile-area {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  h2 { font-size: 1.5rem; color: ${({ theme }) => theme.COLORS.GRAY_700}; }
  span { color: ${({ theme }) => theme.COLORS.GRAY_600}; font-size: 1rem; }
  
  img { 
    width: 50px;
    height: 50px; 
    border-radius: 50%; 
    border: 2px solid ${({ theme }) => theme.COLORS.GRAY_700}; 
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.COLORS.RED_DARK};
  }
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
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: ${({ theme }) => theme.COLORS.GRAY_300}; }
  
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
  const [user, setUser] = useState({ name: 'Carregando...' });
  const navigate = useNavigate();

  async function loadData() {
    try {
      const [mealsRes, metricsRes, userRes] = await Promise.all([
        api.get('/meals'),
        api.get('/metrics'),
        api.get('/me')
      ]);
      setMeals(mealsRes.data);
      setMetrics(metricsRes.data);
      setUser(userRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
      // Se der erro de autenticação, joga pro login
      if(error.response?.status === 401) {
        handleLogout();
      }
    }
  }

  useEffect(() => { loadData(); }, []);

  // Função de Logout
  function handleLogout() {
    // Remove o ID do usuário do armazenamento
    localStorage.removeItem('@dailydiet:userid');
    // Redireciona para a rota raiz (Login)
    navigate('/');
  }

  const percentInDiet = metrics.totalMeals > 0 
    ? ((metrics.totalInDiet / metrics.totalMeals) * 100).toFixed(2) 
    : 0;

  return (
    <Container>
      <Content>
        <Header>
          <div className="user-info">
             <span>Olá,</span>
             <h2>{user.name}</h2>
          </div>
          
          <div className="profile-area">
            <img src="https://github.com/rocketseat.png" alt="Profile"/>
            <LogoutButton onClick={handleLogout} title="Sair">
              <SignOut size={24} />
            </LogoutButton>
          </div>
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
          <MealCard 
            key={meal.id} 
            isOnDiet={meal.isOnDiet}
            onClick={() => navigate(`/meal/${meal.id}`)}
          >
            <span>{new Date(meal.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            <div style={{height: 20, width: 1, background: '#ddd'}}></div>
            <strong>{meal.name}</strong>
            <div className="status"></div>
          </MealCard>
        ))}
      </Content>
      
      <Footer />
    </Container>
  );
}