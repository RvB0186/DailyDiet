const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

// --- BANCO DE DADOS EM MEMÓRIA (Arrays) ---
// Como não usamos banco real, esses dados somem ao reiniciar o servidor
const users = [];
const meals = [];

// --- MIDDLEWARE (Verificação de Usuário) ---
// Regra: Identificar o usuário entre as requisições pelo Header 'user-id'
function checkUserExists(req, res, next) {
  const userId = req.headers['user-id']; 
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: User ID missing' });
  }

  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: User not found' });
  }

  req.user = user; // Repassa o usuário encontrado para as rotas
  next();
}

// --- ROTAS ---

// 1. Login (Simulação de Sessão)
// Verifica se o e-mail existe e retorna os dados do usuário (incluindo ID)
app.post('/sessions', (req, res) => {
  const { email } = req.body;
  
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado. Crie uma conta.' });
  }
  
  return res.json(user);
});

// 2. Pegar dados do usuário logado (Perfil)
// Usado pelo Frontend para exibir "Olá, [Nome]" no Header
app.get('/me', checkUserExists, (req, res) => {
  return res.json(req.user);
});

// 3. Criar Usuário (Cadastro)
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Verifica se já existe um usuário com esse e-mail
  const userAlreadyExists = users.find(user => user.email === email);
  if (userAlreadyExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const user = { id: uuidv4(), name, email };
  users.push(user);
  
  return res.status(201).json(user);
});

// 4. Registrar uma refeição
app.post('/meals', checkUserExists, (req, res) => {
  const { name, description, date, isOnDiet } = req.body;
  
  const meal = {
    id: uuidv4(),
    user_id: req.user.id, // Relaciona a refeição ao usuário logado
    name,
    description,
    date, 
    isOnDiet // boolean: true ou false
  };

  meals.push(meal);
  return res.status(201).json(meal);
});

// 5. Listar todas as refeições de um usuário
app.get('/meals', checkUserExists, (req, res) => {
  // Filtra apenas as refeições do usuário que está chamando a API
  const userMeals = meals.filter(m => m.user_id === req.user.id);
  return res.json(userMeals);
});

// 6. Visualizar uma única refeição
app.get('/meals/:id', checkUserExists, (req, res) => {
  const { id } = req.params;
  
  // Garante que a refeição pertença ao usuário logado
  const meal = meals.find(m => m.id === id && m.user_id === req.user.id);
  
  if (!meal) return res.status(404).json({ error: 'Meal not found' });
  return res.json(meal);
});

// 7. Editar uma refeição
app.put('/meals/:id', checkUserExists, (req, res) => {
  const { id } = req.params;
  const { name, description, date, isOnDiet } = req.body;
  
  const mealIndex = meals.findIndex(m => m.id === id && m.user_id === req.user.id);
  
  if (mealIndex < 0) return res.status(404).json({ error: 'Meal not found' });

  // Atualiza os dados mantendo o ID e o user_id originais
  meals[mealIndex] = { 
    ...meals[mealIndex], 
    name, 
    description, 
    date, 
    isOnDiet 
  };
  
  return res.json(meals[mealIndex]);
});

// 8. Apagar uma refeição
app.delete('/meals/:id', checkUserExists, (req, res) => {
  const { id } = req.params;
  
  const mealIndex = meals.findIndex(m => m.id === id && m.user_id === req.user.id);
  
  if (mealIndex < 0) return res.status(404).json({ error: 'Meal not found' });

  meals.splice(mealIndex, 1);
  return res.status(204).send();
});

// 9. Recuperar métricas de um usuário
app.get('/metrics', checkUserExists, (req, res) => {
  const userMeals = meals
    .filter(m => m.user_id === req.user.id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const totalMeals = userMeals.length;
  const totalInDiet = userMeals.filter(m => m.isOnDiet).length;
  const totalOutDiet = userMeals.filter(m => !m.isOnDiet).length;

  // Lógica para calcular a melhor sequência
  let bestSequence = 0;
  let currentSequence = 0;

  userMeals.forEach(meal => {
    if (meal.isOnDiet) {
      currentSequence++;
      if (currentSequence > bestSequence) {
        bestSequence = currentSequence;
      }
    } else {
      currentSequence = 0;
    }
  });

  return res.json({
    totalMeals,
    totalInDiet,
    totalOutDiet,
    bestSequence
  });
});

// Inicia o servidor
app.listen(3333, () => console.log('Server running on port 3333 🚀'));