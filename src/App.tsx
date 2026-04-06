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
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminBookings from './pages/Admin/AdminBookings';
import AdminRooms from './pages/Admin/AdminRooms';
import AdminReviews from './pages/Admin/AdminReviews';
import AdminInquiries from './pages/Admin/AdminInquiries';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Layout wrapper for public pages (with Navbar and Footer)
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App: React.FC = () => {
  // useLocation is available for future use if needed
  useLocation();

  return (
    <div className="app-container">
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/rooms" element={<PublicLayout><RoomsPage /></PublicLayout>} />
        <Route path="/rooms/:id" element={<PublicLayout><RoomDetails /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/amenities" element={<PublicLayout><Amenities /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/reviews" element={<PublicLayout><ReviewsPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />

        {/* Admin Routes (no Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/inquiries" element={<AdminInquiries />} />

        {/* 404 */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </div>
  );
};

export default App;

