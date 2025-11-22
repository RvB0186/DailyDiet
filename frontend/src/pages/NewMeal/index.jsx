import { useState } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';

const Container = styled.div`
  background: ${({ theme }) => theme.COLORS.GRAY_300};
  height: 100vh;
`;

const Header = styled.div`
  padding: 2rem;
  display: flex;
  gap: 30%;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Form = styled.form`
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  input, textarea, select {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }
  
  label { font-weight: bold; font-size: 0.9rem; color: #444; }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.COLORS.GRAY_600};
  color: white;
  border: 0;
  padding: 16px;
  border-radius: 6px;
  font-weight: bold;
  margin-top: auto;
  
  &:hover { background: ${({ theme }) => theme.COLORS.GRAY_700}; }
`;

export function NewMeal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isOnDiet, setIsOnDiet] = useState("yes"); // "yes" or "no"
  const navigate = useNavigate();

  async function handleCreateMeal(e) {
    e.preventDefault();
    try {
      await api.post('/meals', {
        name,
        description,
        date: new Date().toISOString(),
        isOnDiet: isOnDiet === "yes"
      });
      alert('Refeição cadastrada!');
      navigate('/');
    } catch (error) {
      alert("Erro ao cadastrar.");
    }
  }

  return (
    <Container>
      <Header>
        <Link to="/"><ArrowLeft size={24} color="#333"/></Link>
        <span>Nova refeição</span>
      </Header>
      
      <Form onSubmit={handleCreateMeal}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
          <label>Nome</label>
          <input required onChange={e => setName(e.target.value)} />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
          <label>Descrição</label>
          <textarea required rows={3} onChange={e => setDescription(e.target.value)} />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
           <label>Está dentro da dieta?</label>
           <select value={isOnDiet} onChange={e => setIsOnDiet(e.target.value)}>
             <option value="yes">Sim</option>
             <option value="no">Não</option>
           </select>
        </div>

        <Button type="submit">Cadastrar Refeição</Button>
      </Form>
    </Container>
  );
}