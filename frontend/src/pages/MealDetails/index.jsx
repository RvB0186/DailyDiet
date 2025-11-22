import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, PencilSimple, Trash } from 'phosphor-react';
import { Footer } from '../../components/Footer'; 

const Container = styled.div`
  background: ${({ theme, isOnDiet }) => isOnDiet ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.COLORS.GRAY_700};

  a { position: absolute; left: 2rem; }
`;

const Content = styled.div`
  background: white;
  border-radius: 20px 20px 20px 20px;
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 700px;
  width: 100%;
  
  /* ALTERADO AQUI: */
  /* 0 no topo | auto nas laterais | 2rem embaixo */
  margin: 0 auto 2rem; 
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

const DateInfo = styled.div`
  h3 { font-size: 1rem; color: ${({ theme }) => theme.COLORS.GRAY_700}; margin-bottom: 5px; }
  p { font-size: 1.1rem; color: ${({ theme }) => theme.COLORS.GRAY_500}; }
`;

const Tag = styled.div`
  background: ${({ theme }) => theme.COLORS.GRAY_300};
  padding: 8px 16px;
  border-radius: 1000px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  font-size: 0.9rem;

  .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: ${({ isOnDiet, theme }) => isOnDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
  }
`;


const ButtonsContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background: ${({ theme, variant }) => variant === 'secondary' ? 'transparent' : theme.COLORS.GRAY_600};
  color: ${({ theme, variant }) => variant === 'secondary' ? theme.COLORS.GRAY_700 : 'white'};
  border: ${({ theme, variant }) => variant === 'secondary' ? `1px solid ${theme.COLORS.GRAY_700}` : '0'};
  padding: 16px;
  border-radius: 6px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover { filter: brightness(0.9); }
`;

export function MealDetails() {
  const [meal, setMeal] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/meals/${id}`)
      .then(response => setMeal(response.data))
      .catch(() => {
         alert("Erro ao carregar refeição.");
         navigate('/');
      });
  }, [id, navigate]);

  async function handleDelete() {
    if (window.confirm("Deseja excluir esta refeição?")) {
      await api.delete(`/meals/${id}`);
      navigate('/');
    }
  }

  if (!meal) return <div style={{padding: 20}}>Carregando...</div>;

  return (
    <Container isOnDiet={meal.isOnDiet}>
      <Header>
        <Link to="/home"><ArrowLeft size={24} color="#333"/></Link>
        <span>Refeição</span>
      </Header>

      <Content>
        <div>
          <Title>{meal.name}</Title>
          <Description>{meal.description}</Description>
        </div>

        <DateInfo>
          <h3>Data e hora</h3>
          <p>{new Date(meal.date).toLocaleString()}</p>
        </DateInfo>

        <Tag isOnDiet={meal.isOnDiet}>
          <div className="dot"></div>
          {meal.isOnDiet ? "Dentro da dieta" : "Fora da dieta"}
        </Tag>

        <ButtonsContainer>
          <Button onClick={() => navigate(`/edit/${meal.id}`)}>
             <PencilSimple size={18} /> Editar refeição
          </Button>
          <Button variant="secondary" onClick={handleDelete}>
             <Trash size={18} /> Excluir refeição
          </Button>
        </ButtonsContainer>
      </Content>
      
      <Footer />
      
    </Container>
  );
}