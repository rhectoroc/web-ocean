import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import LegalNotice from './pages/public/LegalNotice';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import FloatingChatbot from './components/FloatingChatbot';

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <FloatingChatbot />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
