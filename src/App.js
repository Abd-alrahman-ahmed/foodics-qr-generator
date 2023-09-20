import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import RulesPage from "./pages/RulesPage";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/rulesPage" element={<RulesPage />} />

          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
