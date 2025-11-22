import { useState } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ForkKnife } from 'phosphor-react';
import { Footer } from '../../components/Footer';

// 1. Alteração no Container: flex-direction column e removemos os alinhamentos centrais daqui
const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.COLORS.GRAY_300};
  display: flex;
  flex-direction: column; /* Empilha os elementos verticalmente */
`;

// 2. Novo componente para ocupar o espaço e centralizar o Card
const Content = styled.div`
  flex: 1; /* Ocupa todo o espaço sobrando, empurrando o footer para baixo */
  display: flex;
  align-items: center; /* Centraliza o card verticalmente */
  justify-content: center; /* Centraliza o card horizontalmente */
  width: 100%;
`;

const Card = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  background: ${({ theme, variant }) => variant === 'secondary' ? 'transparent' : theme.COLORS.GRAY_600};
  color: ${({ theme, variant }) => variant === 'secondary' ? theme.COLORS.GRAY_700 : 'white'};
  border: ${({ theme, variant }) => variant === 'secondary' ? `1px solid ${theme.COLORS.GRAY_700}` : '0'};
  padding: 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover { filter: brightness(0.9); }
`;

export function SignIn() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); 
  const [isRegistering, setIsRegistering] = useState(false);
  
  const navigate = useNavigate();

  async function handleAuth() {
    if (!email) return alert("Digite o e-mail");

    try {
      let response;
      
      if (isRegistering) {
        if (!name) return alert("Digite seu nome");
        response = await api.post('/users', { name, email });
        alert("Conta criada com sucesso! Faça login.");
        setIsRegistering(false);
        return; 
      } else {
        response = await api.post('/sessions', { email });
      }

      const user = response.data;
      localStorage.setItem('@dailydiet:userid', user.id);
      navigate('/home');

    } catch (error) {
      if (error.response?.status === 404) {
        alert("Usuário não encontrado. Crie uma conta.");
      } else if (error.response?.status === 400) {
        alert("Usuário já existe.");
      } else {
        alert("Erro ao autenticar.");
      }
    }
  }

  return (
    <Container>
      {/* 3. Envolvemos o Card no Content */}
      <Content>
        <Card>
          <Logo>
            <ForkKnife size={40} />
            Daily Diet
          </Logo>

          {isRegistering && (
            <Input 
              placeholder="Seu nome" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          )}
          
          <Input 
            placeholder="Seu e-mail" 
            type="email"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />

          <Button onClick={handleAuth}>
            {isRegistering ? 'Cadastrar' : 'Entrar'}
          </Button>
          
          <Button variant="secondary" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Já tenho conta' : 'Criar conta'}
          </Button>
        </Card>
      </Content>
      
      <Footer />
    </Container>
  );
}