import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import RoomsPage from './pages/Rooms/Rooms';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomsPage />} />
        {/* Placeholders for other routes to prevent 404s if links clicked */}
        <Route path="/services" element={<div className="pt-32 text-center"><h1>Services Coming Soon</h1></div>} />
        <Route path="/gallery" element={<div className="pt-32 text-center"><h1>Gallery Coming Soon</h1></div>} />
        <Route path="/contact" element={<div className="pt-32 text-center"><h1>Contact Coming Soon</h1></div>} />
        <Route path="/about" element={<div className="pt-32 text-center"><h1>About Us Coming Soon</h1></div>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
