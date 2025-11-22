import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';

const Container = styled.div`
  background: ${({ theme }) => theme.COLORS.GRAY_300};
  height: 100vh;
`;

const Header = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center; /* Centraliza o texto */
  position: relative;
  
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.COLORS.GRAY_700};

  /* A seta fica absoluta na esquerda para não empurrar o texto */
  a {
    position: absolute;
    left: 2rem;
  }
`;

const Form = styled.form`
  background: white;
  border-radius: 20px 20px 20px 20px;
  padding: 2rem;
  height: 70%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 700px;
  width: 100%;
  margin: 0 auto; 

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
  // Estados para guardar os valores do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isOnDiet, setIsOnDiet] = useState("yes");
  const [date, setDate] = useState(null); // Para guardar a data original na edição
  
  const navigate = useNavigate();
  
  // HOOK MÁGICO: Pega o ID da URL (ex: /edit/123)
  const { id } = useParams(); 
  
  // Se tiver ID, é edição (true). Se não tiver, é criação (false).
  const isEditing = !!id; 

  // EFEITO: Carrega os dados se for edição
  useEffect(() => {
    if (isEditing) {
      api.get(`/meals/${id}`)
        .then(response => {
          const { name, description, isOnDiet, date } = response.data;
          setName(name);
          setDescription(description);
          setIsOnDiet(isOnDiet ? "yes" : "no");
          setDate(date);
        })
        .catch(error => {
          console.error("Erro ao carregar refeição:", error);
          alert("Erro ao carregar dados. Talvez o servidor tenha reiniciado?");
          navigate('/');
        });
    }
  }, [id, isEditing, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const dataToSend = {
        name,
        description,
        date: date || new Date().toISOString(), // Mantém data original ou cria nova
        isOnDiet: isOnDiet === "yes"
      };

      if (isEditing) {
        // PUT: Atualiza
        await api.put(`/meals/${id}`, dataToSend);
        alert('Refeição atualizada com sucesso!');
      } else {
        // POST: Cria nova
        await api.post('/meals', dataToSend);
        alert('Refeição cadastrada com sucesso!');
      }
      
      navigate('/');
    } catch (error) {
      alert("Erro ao salvar. Verifique o console.");
    }
  }

  return (
    <Container>
      <Header>
        <Link to="/"><ArrowLeft size={24} color="#333"/></Link>
        {/* Muda o título dinamicamente */}
        <span>{isEditing ? 'Editar refeição' : 'Nova refeição'}</span>
      </Header>
      
      <Form onSubmit={handleSubmit}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
          <label>Nome</label>
          <input 
            required 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
          <label>Descrição</label>
          <textarea 
            required 
            rows={3} 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
           <label>Está dentro da dieta?</label>
           <select value={isOnDiet} onChange={e => setIsOnDiet(e.target.value)}>
             <option value="yes">Sim</option>
             <option value="no">Não</option>
           </select>
        </div>

        <Button type="submit">
          {isEditing ? 'Salvar alterações' : 'Cadastrar Refeição'}
        </Button>
      </Form>
    </Container>
  );
}