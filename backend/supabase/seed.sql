-- =====================================================
-- ELOHEEM SUITES - SEED DATA
-- Description: Initial data for rooms, services, and settings
-- =====================================================

-- =====================================================
-- SEED ROOMS
-- =====================================================
INSERT INTO rooms (name, slug, type, category, description, short_description, price, capacity_adults, bed_type, images, amenities, is_featured, display_order) VALUES

-- Accommodation Rooms
(
    'Royal Room',
    'royal-room',
    'ROYAL',
    'accommodation',
    'Enjoy a cozy stay with modern amenities in our Royal Room. Perfect for solo travelers or couples seeking comfort and value. Features include air conditioning, smart TV, high-speed WiFi, and complimentary breakfast.',
    'Cozy comfort with modern amenities',
    17500.00,
    2,
    'King Size',
    ARRAY[
        'https://codesnippet-741238344.imgix.net/eloheem/_11A2439.JPG',
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2017.16.55.jpeg',
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2013.40.34-2.jpeg'
    ],
    ARRAY['WiFi', 'Air Conditioning', 'Smart TV', 'Mini Fridge', 'Room Service'],
    false,
    1
),
(
    'Queens & Kings Room',
    'queens-kings-room',
    'QUEENS_KINGS',
    'accommodation',
    'Spacious and elegant, our Queens & Kings Room is perfect for couples or business travelers who appreciate extra space and premium comfort. Enjoy premium bedding, a work desk, and enhanced room service.',
    'Spacious elegance for discerning guests',
    21500.00,
    2,
    'King Size',
    ARRAY[
        'https://codesnippet-741238344.imgix.net/eloheem/eloheem5.jpg',
        'https://codesnippet-741238344.imgix.net/eloheem/eloheem2.jpg',
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2017.16.15.jpeg'
    ],
    ARRAY['WiFi', 'Air Conditioning', 'Smart TV', 'Work Desk', 'Mini Bar', 'Premium Toiletries'],
    true,
    2
),
(
    'Executive Luxury Suite',
    'executive-luxury-room',
    'EXECUTIVE_LUXURY',
    'accommodation',
    'Ultimate luxury with premium features in our Executive Luxury Suite. This is our flagship room featuring a separate living area, premium amenities, and VIP treatment including priority room service and complimentary minibar.',
    'Ultimate luxury and VIP treatment',
    35000.00,
    2,
    'King Size',
    ARRAY[
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2017.16.32.jpeg',
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2017.16.14.jpeg',
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2017.16.13.jpeg'
    ],
    ARRAY['WiFi', 'Air Conditioning', 'Smart TV', 'Living Area', 'Jacuzzi', 'Mini Bar', 'VIP Service', 'Complimentary Breakfast'],
    true,
    3
),

-- Event Spaces
(
    'Golden Hall',
    'golden-hall',
    'GOLDEN_HALL',
    'event_space',
    'Host intimate events for 40-70 guests in our elegant Golden Hall. Perfect for corporate meetings, seminars, birthday celebrations, and small weddings. Includes basic setup, chairs, tables, and air conditioning.',
    'Intimate venue for 40-70 guests',
    107500.00,
    70,
    NULL,
    ARRAY[
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2017.16.23.jpeg',
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2017.16.11.jpeg'
    ],
    ARRAY['Air Conditioning', 'Projector Available', 'Sound System', 'WiFi', 'Parking', 'Catering Available'],
    false,
    4
),
(
    'Reception Ground',
    'reception-ground',
    'RECEPTION_GROUND',
    'event_space',
    'Ideal for large gatherings of 500-800 guests. Our Reception Ground is a beautiful outdoor/covered venue perfect for weddings, conferences, and grand celebrations. Includes basic canopy setup and ample parking.',
    'Grand venue for 500-800 guests',
    161250.00,
    800,
    NULL,
    ARRAY[
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2017.16.11.jpeg',
        'https://codesnippet-741238344.imgix.net/eloheem/WhatsApp%20Image%202025-05-16%20at%2017.16.57.jpeg'
    ],
    ARRAY['Covered Area', 'Outdoor Space', 'Ample Parking', 'Generator Backup', 'Catering Available', 'Decoration Services'],
    true,
    5
);

-- =====================================================
-- SEED SERVICES
-- =====================================================
INSERT INTO services (name, slug, description, category, icon, price, price_unit, is_complimentary, display_order) VALUES

('Photography Services', 'photography', 'Professional photography services for events and special occasions.', 'media', 'FaCamera', 50000.00, 'per_event', false, 1),
('Projector Rental', 'projector-rental', 'HD projectors available for meetings, seminars, and movie nights.', 'equipment', 'FaVideo', 15000.00, 'per_day', false, 2),
('Fine Dining', 'fine-dining', 'Exquisite local and continental cuisine prepared by our expert chefs.', 'dining', 'FaUtensils', NULL, 'varies', false, 3),
('High-Speed WiFi', 'wifi', 'Complimentary fiber-optic internet throughout the hotel.', 'connectivity', 'FaWifi', NULL, NULL, true, 4),
('Secure Parking', 'parking', 'Spacious and secure parking facility with 24/7 surveillance.', 'facilities', 'FaCar', NULL, NULL, true, 5),
('24/7 Security', 'security', 'Round-the-clock security with trained personnel and CCTV.', 'safety', 'FaUserShield', NULL, NULL, true, 6),
('Laundry Service', 'laundry', 'Professional laundry and dry cleaning services.', 'housekeeping', 'FaTshirt', 3000.00, 'per_load', false, 7),
('Event Decoration', 'decoration', 'Transform your venue with our expert decoration partners.', 'events', 'FaPaintBrush', NULL, 'custom_quote', false, 8),
('Airport Shuttle', 'airport-shuttle', 'Convenient and safe transportation to and from the airport.', 'transport', 'FaShuttleVan', 25000.00, 'per_trip', false, 9),
('Room Service', 'room-service', '24-hour in-room dining and responsive service.', 'dining', 'FaConciergeBell', NULL, 'menu_prices', false, 10);

-- =====================================================
-- SEED REVIEWS (Sample approved reviews)
-- =====================================================
INSERT INTO reviews (rating, title, content, guest_name, guest_location, guest_avatar, is_approved, is_featured) VALUES

(5, 'Wonderful Stay!', 'A wonderful stay! The Royal Room was cozy and the staff were incredibly welcoming. The attention to detail and the quality of service exceeded all my expectations.', 'Sarah Mitchell', 'United Kingdom', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80', true, true),
(5, 'Perfect Event Venue', 'The Golden Hall was perfect for our family event. Everything was flawless! The venue was beautifully decorated and the catering was exceptional.', 'Ahmed Khalil', 'Nigeria', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80', true, true),
(5, 'Luxury at its Best', 'Luxury at its best! The Executive Suite exceeded my expectations. Perfect for business travelers who appreciate quality and comfort.', 'Emily Richards', 'United States', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80', true, true),
(5, 'Hidden Gem', 'Eloheem Suites is truly a hidden gem in Kwali. The serene environment and top-notch facilities made our anniversary celebration unforgettable.', 'David & Grace Okonkwo', 'Lagos, Nigeria', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80', true, false);

-- =====================================================
-- SEED SETTINGS
-- =====================================================
INSERT INTO settings (key, value, description) VALUES

('hotel_info', '{"name": "Eloheem Suites", "tagline": "Comfort is our culture", "address": "Holiness Camp Ground, Kwali, Abuja, Nigeria", "phone": "+234 XXX XXX XXXX", "email": "info@eloheemsuits.com", "check_in_time": "14:00", "check_out_time": "12:00"}', 'Basic hotel information'),
('tax_rate', '{"vat": 7.5}', 'Tax rates for billing'),
('payment_settings', '{"currency": "NGN", "min_deposit_percent": 30, "paystack_enabled": true}', 'Payment configuration'),
('booking_settings', '{"max_advance_days": 365, "min_advance_hours": 6, "cancellation_hours": 48}', 'Booking rules'),
('notification_emails', '{"bookings": "bookings@eloheemsuits.com", "inquiries": "info@eloheemsuits.com"}', 'Email addresses for notifications');
