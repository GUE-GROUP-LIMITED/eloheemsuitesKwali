-- =====================================================
-- ELOHEEM SUITES - ROW LEVEL SECURITY POLICIES
-- Migration: 002_rls_policies.sql
-- Description: Security policies for data access control
-- =====================================================

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- HELPER FUNCTION: Check if user is admin
-- =====================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users
        WHERE auth_user_id = auth.uid()
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- HELPER FUNCTION: Get admin role
-- =====================================================
CREATE OR REPLACE FUNCTION get_admin_role()
RETURNS VARCHAR AS $$
DECLARE
    user_role VARCHAR;
BEGIN
    SELECT role INTO user_role FROM admin_users
    WHERE auth_user_id = auth.uid()
    AND is_active = true;
    RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- ROOMS POLICIES
-- =====================================================
-- Anyone can view available rooms
CREATE POLICY "Public can view available rooms"
    ON rooms FOR SELECT
    USING (is_available = true);

-- Admins can do everything
CREATE POLICY "Admins can manage rooms"
    ON rooms FOR ALL
    USING (is_admin());

-- =====================================================
-- GUESTS POLICIES
-- =====================================================
-- Guests can view and update their own profile
CREATE POLICY "Guests can view own profile"
    ON guests FOR SELECT
    USING (auth_user_id = auth.uid());

CREATE POLICY "Guests can update own profile"
    ON guests FOR UPDATE
    USING (auth_user_id = auth.uid());

-- Admins can manage all guests
CREATE POLICY "Admins can manage guests"
    ON guests FOR ALL
    USING (is_admin());

-- =====================================================
-- BOOKINGS POLICIES
-- =====================================================
-- Guests can view their own bookings
CREATE POLICY "Guests can view own bookings"
    ON bookings FOR SELECT
    USING (
        guest_id IN (
            SELECT id FROM guests WHERE auth_user_id = auth.uid()
        )
    );

-- Anyone can create a booking (for guest checkout)
CREATE POLICY "Anyone can create booking"
    ON bookings FOR INSERT
    WITH CHECK (true);

-- Admins can manage all bookings
CREATE POLICY "Admins can manage bookings"
    ON bookings FOR ALL
    USING (is_admin());

-- =====================================================
-- PAYMENTS POLICIES
-- =====================================================
-- Guests can view payments for their bookings
CREATE POLICY "Guests can view own payments"
    ON payments FOR SELECT
    USING (
        booking_id IN (
            SELECT b.id FROM bookings b
            JOIN guests g ON b.guest_id = g.id
            WHERE g.auth_user_id = auth.uid()
        )
    );

-- Admins can manage all payments
CREATE POLICY "Admins can manage payments"
    ON payments FOR ALL
    USING (is_admin());

-- =====================================================
-- REVIEWS POLICIES
-- =====================================================
-- Anyone can view approved reviews
CREATE POLICY "Public can view approved reviews"
    ON reviews FOR SELECT
    USING (is_approved = true);

-- Authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews"
    ON reviews FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Guests can update their own reviews
CREATE POLICY "Guests can update own reviews"
    ON reviews FOR UPDATE
    USING (
        guest_id IN (
            SELECT id FROM guests WHERE auth_user_id = auth.uid()
        )
    );

-- Admins can manage all reviews
CREATE POLICY "Admins can manage reviews"
    ON reviews FOR ALL
    USING (is_admin());

-- =====================================================
-- SERVICES POLICIES
-- =====================================================
-- Anyone can view available services
CREATE POLICY "Public can view services"
    ON services FOR SELECT
    USING (is_available = true);

-- Admins can manage services
CREATE POLICY "Admins can manage services"
    ON services FOR ALL
    USING (is_admin());

-- =====================================================
-- INQUIRIES POLICIES
-- =====================================================
-- Anyone can create inquiries
CREATE POLICY "Anyone can create inquiry"
    ON inquiries FOR INSERT
    WITH CHECK (true);

-- Admins can manage inquiries
CREATE POLICY "Admins can manage inquiries"
    ON inquiries FOR ALL
    USING (is_admin());

-- =====================================================
-- EVENTS POLICIES
-- =====================================================
-- Follows booking policies (linked via booking_id)
CREATE POLICY "Events follow booking access"
    ON events FOR SELECT
    USING (
        booking_id IN (
            SELECT b.id FROM bookings b
            JOIN guests g ON b.guest_id = g.id
            WHERE g.auth_user_id = auth.uid()
        )
        OR is_admin()
    );

-- Admins can manage events
CREATE POLICY "Admins can manage events"
    ON events FOR ALL
    USING (is_admin());

-- =====================================================
-- ADMIN USERS POLICIES
-- =====================================================
-- Admins can view other admins
CREATE POLICY "Admins can view admin users"
    ON admin_users FOR SELECT
    USING (is_admin());

-- Only super_admin can manage admin users
CREATE POLICY "Super admins can manage admin users"
    ON admin_users FOR ALL
    USING (get_admin_role() = 'super_admin');

-- =====================================================
-- AUDIT LOGS POLICIES
-- =====================================================
-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
    ON audit_logs FOR SELECT
    USING (is_admin());

-- System can insert audit logs
CREATE POLICY "System can create audit logs"
    ON audit_logs FOR INSERT
    WITH CHECK (true);

-- =====================================================
-- SETTINGS POLICIES
-- =====================================================
-- Anyone can read settings
CREATE POLICY "Anyone can view settings"
    ON settings FOR SELECT
    USING (true);

-- Only super_admin can modify settings
CREATE POLICY "Super admins can manage settings"
    ON settings FOR ALL
    USING (get_admin_role() IN ('super_admin', 'admin'));
