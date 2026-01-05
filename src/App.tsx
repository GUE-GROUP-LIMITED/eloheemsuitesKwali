import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import RoomsPage from './pages/Rooms/Rooms';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import Services from './pages/Services/Services';
import ContactPage from './pages/Contact/Contact';
import About from './pages/About/About';
import Gallery from './pages/Gallery/Gallery';
import ReviewsPage from './pages/Reviews/Reviews';
import Footer from './components/Footer';
import Amenities from './pages/Amenities/Amenities';
import Booking from './pages/Booking/Booking';
import NotFound from './pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
