import { Routes, Route } from 'react-router-dom';
import { SignIn } from '../pages/SignIn'; 
import { Home } from '../pages/Home';
import { NewMeal } from '../pages/NewMeal';
import { MealDetails } from '../pages/MealDetails';
import { Metrics } from '../pages/Metrics';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota Raiz: Agora é o Login */}
      <Route path="/" element={<SignIn />} />
      
      {/* Rotas protegidas (acessíveis após login) */}
      <Route path="/home" element={<Home />} />
      
      {/* Criação e Edição usam o mesmo componente */}
      <Route path="/new" element={<NewMeal />} />
      <Route path="/edit/:id" element={<NewMeal />} />
      
      {/* Detalhes da refeição */}
      <Route path="/meal/:id" element={<MealDetails />} />
      
      {/* Métricas */}
      <Route path="/metrics" element={<Metrics />} />
    </Routes>
  );
}