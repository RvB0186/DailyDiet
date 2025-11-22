import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import { Footer } from '../../components/Footer';

const Container = styled.div`
  background: ${({ theme }) => theme.COLORS.GRAY_300};
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

  a {
    position: absolute;
    left: 2rem;
  }
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  flex: 1;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 2rem;
  border-radius: 20px;

  input, textarea, select {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-size: 1rem;
    
    /* Opcional: Estilizando a cor do placeholder se quiser mudar o cinza padrão */
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_400};
    }
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
  const [isOnDiet, setIsOnDiet] = useState("yes");
  const [dateTime, setDateTime] = useState(''); 
  
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      api.get(`/meals/${id}`)
        .then(response => {
          const { name, description, isOnDiet, date } = response.data;
          setName(name);
          setDescription(description);
          setIsOnDiet(isOnDiet ? "yes" : "no");
          
          if (date) {
             const formattedDate = new Date(date).toISOString().slice(0, 16);
             setDateTime(formattedDate);
          }
        })
        .catch(() => navigate('/home'));
    }
  }, [id, isEditing, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const finalDate = dateTime ? new Date(dateTime).toISOString() : new Date().toISOString();

      const dataToSend = {
        name,
        description,
        date: finalDate, 
        isOnDiet: isOnDiet === "yes"
      };

      if (isEditing) {
          await api.put(`/meals/${id}`, dataToSend);
          alert('Refeição atualizada!');
      } else {
          await api.post('/meals', dataToSend);
          alert('Refeição criada!');
      }
      
      navigate('/home');
    } catch (error) {
      alert("Erro ao salvar.");
    }
  }

  return (
    <Container>
      <Header>
        <Link to="/home"><ArrowLeft size={24} color="#333"/></Link>
        <span>{isEditing ? 'Editar refeição' : 'Nova refeição'}</span>
      </Header>
      
      <Form onSubmit={handleSubmit}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
          <label>Nome</label>
          <input 
            required 
            placeholder="Ex.: Café da manhã, Almoço, Janta..."
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
          <label>Descrição</label>
         
          <textarea 
            required 
            rows={3} 
            placeholder="Ex.: Sanduíche de pão integral com atum e salada..."
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
          <label>Data e Hora</label>
          <input 
            type="datetime-local"
            required
            value={dateTime} 
            onChange={e => setDateTime(e.target.value)} 
          />
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
           <label>Está dentro da dieta?</label>
           <select value={isOnDiet} onChange={e => setIsOnDiet(e.target.value)}>
             <option value="yes">Sim</option>
             <option value="no">Não</option>
           </select>
        </div>

        <Button type="submit">{isEditing ? 'Salvar alterações' : 'Cadastrar Refeição'}</Button>
      </Form>

      <Footer />
    </Container>
  );
}