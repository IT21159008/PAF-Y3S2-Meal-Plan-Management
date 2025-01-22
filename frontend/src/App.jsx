import { BrowserRouter, Routes, Route } from "react-router-dom";
import MealPlansPage from "./Pages/MealPlanner/MealPlansPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MealPlansPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
