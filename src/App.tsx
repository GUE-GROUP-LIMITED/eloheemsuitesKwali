import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import RoomsPage from './pages/Rooms/Rooms';
import Services from './pages/Services/Services';
import ContactPage from './pages/Contact/Contact';
import About from './pages/About/About';
import Gallery from './pages/Gallery/Gallery';
import ReviewsPage from './pages/Reviews/Reviews';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
