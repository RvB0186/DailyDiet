// src/server.js
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

// --- BANCO DE DADOS EM MEMÓRIA (Arrays) ---
const users = [];
const meals = [];

// --- MIDDLEWARE (Verificação de Usuário) ---
// Regra: Identificar o usuário entre as requisições
function checkUserExists(req, res, next) {
  const userId = req.headers['user-id']; // O Frontend enviará isso no cabeçalho
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const user = users.find(u => u.id === userId);
  if (!user) return res.status(401).json({ error: 'User not found' });

  req.user = user;
  next();
}

// --- ROTAS ---

// 1. Criar Usuário
app.get('/me', checkUserExists, (req, res) => {
  return res.json(req.user);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  // Cria um ID único para o usuário
  const user = { id: uuidv4(), name, email };
  users.push(user);
  
  // Retorna o usuário criado (o Frontend vai precisar desse ID)
  return res.status(201).json(user);
});

// 2. Registrar uma refeição
app.post('/meals', checkUserExists, (req, res) => {
  const { name, description, date, isOnDiet } = req.body;
  
  const meal = {
    id: uuidv4(),
    user_id: req.user.id, // Relaciona a refeição ao usuário
    name,
    description,
    date, 
    isOnDiet // true ou false
  };

  meals.push(meal);
  return res.status(201).json(meal);
});

// 3. Listar todas as refeições de um usuário
app.get('/meals', checkUserExists, (req, res) => {
  const userMeals = meals.filter(m => m.user_id === req.user.id);
  return res.json(userMeals);
});

// 4. Visualizar uma única refeição
app.get('/meals/:id', checkUserExists, (req, res) => {
  const { id } = req.params;
  const meal = meals.find(m => m.id === id && m.user_id === req.user.id);
  
  if (!meal) return res.status(404).json({ error: 'Meal not found' });
  return res.json(meal);
});

// 5. Editar uma refeição
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

// 6. Apagar uma refeição
app.delete('/meals/:id', checkUserExists, (req, res) => {
  const { id } = req.params;
  const mealIndex = meals.findIndex(m => m.id === id && m.user_id === req.user.id);
  
  if (mealIndex < 0) return res.status(404).json({ error: 'Meal not found' });

  meals.splice(mealIndex, 1);
  return res.status(204).send();
});

// 7. Recuperar métricas de um usuário
app.get('/metrics', checkUserExists, (req, res) => {
  const userMeals = meals
    .filter(m => m.user_id === req.user.id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const totalMeals = userMeals.length;
  const totalInDiet = userMeals.filter(m => m.isOnDiet).length;
  const totalOutDiet = userMeals.filter(m => !m.isOnDiet).length;

  // Lógica para calcular a melhor sequência (best sequence)
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

// Inicia o servidor na porta 3333
app.listen(3333, () => console.log('Server running on port 3333 🚀'));