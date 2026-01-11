import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import PredictionPage from './pages/PredictionPage';
import PreventionPage from './pages/PreventionPage';
import { Heart, Linkedin, Github } from 'lucide-react';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/predict" element={<PredictionPage />} />
          <Route path="/prevention" element={<PreventionPage />} />
        </Routes>
      </main>

      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '3rem 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-light)', fontWeight: '700', fontSize: '1.25rem' }}>
            <Heart size={24} fill="currentColor" /> CardioPredict
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1rem', fontWeight: '600' }}>Connect with me</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <a href="https://www.linkedin.com/in/yash-virsodiya-ab5b3b2a7/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/virsodiyayash" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
              <Github size={24} />
            </a>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>© 2026 CardioPredict AI. Empowering health through data.</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.6rem', marginBottom: '0.5rem' }}>All credits of UI goes to antigravity</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;

