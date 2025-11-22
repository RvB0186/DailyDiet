import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { NewMeal } from '../pages/NewMeal';
import { MealDetails } from '../pages/MealDetails'; // Nova página
import { Metrics } from '../pages/Metrics';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewMeal />} />
      <Route path="/edit/:id" element={<NewMeal />} />
      <Route path="/meal/:id" element={<MealDetails />} />
      <Route path="/metrics" element={<Metrics />} />
    </Routes>
  );
}