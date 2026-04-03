import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import PredictionPage from './pages/PredictionPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
        <Navbar />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/predict" element={<PredictionPage />} />
          {/* Catch-all to redirect back to home if needed */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
