# Daily Diet - Projeto Fullstack

> **Disciplina:** Programação para WEB II  
> **Instituição:** Unitins - Universidade Estadual do Tocantins  
> **Atividade:** Avaliativa A2 - Projeto Fullstack
> **Aluno:** Riê Veloso de Brito

Projeto desenvolvido com o objetivo de criar uma aplicação completa (Fullstack) para controle de dieta diária. A aplicação permite que usuários criem contas, registrem suas refeições, classifiquem a dieta e acompanhem métricas de progresso em tempo real.

---

## 📋 Requisitos e Funcionalidades

O projeto atende integralmente aos requisitos solicitados na **Atividade A2**, implementando as seguintes regras de negócio e funcionalidades:

### 👤 Usuários e Autenticação
- [x] **Cadastro de Usuário:** Interface para criação de nova conta (Nome e E-mail).
- [x] **Login (Simulação):** Acesso via e-mail cadastrado.
- [x] **Identificação de Sessão:** O usuário é identificado entre as requisições via Header (`user-id`), garantindo que cada pessoa acesse apenas seus próprios dados.
- [x] **Persistência Local:** O ID do usuário é salvo no `localStorage` do navegador para manter a sessão ativa.

### 🍽️ Gestão de Refeições (CRUD)
- [x] **Registrar Refeição:** Cadastro com Nome, Descrição, Data/Hora e indicador de dieta (Dentro/Fora).
- [x] **Listagem:** Visualização de todas as refeições do usuário, agrupadas cronologicamente.
- [x] **Detalhes:** Visualização individual de uma refeição.
- [x] **Edição:** Permite alterar todos os dados de uma refeição já cadastrada.
- [x] **Exclusão:** Permite remover registros indesejados.

### 📊 Dashboard de Métricas
Cálculo automático e exibição de:
- [x] Quantidade total de refeições registradas.
- [x] Total de refeições **dentro** da dieta.
- [x] Total de refeições **fora** da dieta.
- [x] **Melhor sequência** (streak) de refeições dentro da dieta.

---

## 🚀 Tecnologias Utilizadas

O projeto foi arquitetado em duas camadas distintas (Backend e Frontend), garantindo a separação de responsabilidades.

### Backend (API RESTful)
- **Node.js:** Ambiente de execução.
- **Express:** Framework para gerenciamento de rotas e servidor.
- **UUID:** Geração de identificadores únicos universais.
- **CORS:** Controle de acesso para integração com o frontend.
- **Middleware Personalizado:** Validação de existência do usuário (`checkUserExists`).
- **Banco de Dados em Memória:** Arrays (`users`, `meals`) para persistência volátil durante a execução.

### Frontend (SPA)
- **React + Vite:** Construção da interface ágil e performática.
- **Styled Components:** Estilização CSS-in-JS com temas globais e componentes isolados.
- **React Router DOM:** Gerenciamento de rotas e navegação (SPA).
- **Axios:** Cliente HTTP para consumo da API e uso de interceptors (injeção automática do ID no header).
- **Phosphor React:** Biblioteca de ícones para interface visual.

---

## 📂 Estrutura do Projeto

```text
DAILYDIET/
│
├── backend/               # API Node.js
│   ├── src/
│   │   └── server.js      # Lógica do servidor, rotas e regras de negócio
│   └── package.json
│
└── frontend/              # Interface React
    ├── src/
    │   ├── components/    # Componentes globais (Footer, etc.)
    │   ├── pages/         # Telas (SignIn, Home, NewMeal, MealDetails, Metrics)
    │   ├── routes/        # Configuração de navegação
    │   ├── services/      # Configuração do Axios
    │   └── styles/        # Temas de cores e estilos globais
    └── package.json

    📦 Como Rodar o Projeto

Para executar a aplicação completa, é necessário rodar o backend e o frontend simultaneamente em terminais separados.

Pré-requisitos
Node.js instalado (versão 18 ou superior).

Gerenciador de pacotes NPM.

Passo 1: Iniciar a API (Backend)
Abra um terminal na pasta raiz do projeto.

Acesse a pasta do backend:
Bash
cd backend

Instale as dependências:
Bash
npm install

Inicie o servidor:
Bash
npm run dev
# ou
node src/server.js
O servidor rodará na porta 3333.

Passo 2: Iniciar a Interface (Frontend)
Abra um novo terminal.

Acesse a pasta do frontend:
Bash
cd frontend

Instale as dependências:
Bash
npm install

nicie o projeto React:
Bash
npm run dev

Acesse o link exibido no terminal (geralmente http://localhost:5173).

📝 Observações Importantes
Banco de Dados Volátil: O backend utiliza vetores em memória para armazenar os dados. Se o servidor backend for reiniciado, todos os usuários e refeições cadastrados serão perdidos.

Fluxo de Uso: - Ao abrir a aplicação, utilize a opção "Criar conta" para registrar seu primeiro usuário.

Após o cadastro, faça login com o e-mail registrado.

O sistema manterá você logado mesmo se atualizar a página (F5), graças ao uso do localStorage. Para trocar de usuário, utilize o botão de Sair no topo da Home.