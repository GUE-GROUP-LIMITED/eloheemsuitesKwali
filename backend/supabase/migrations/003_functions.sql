-- =====================================================
-- ELOHEEM SUITES - DATABASE FUNCTIONS
-- Migration: 003_functions.sql
-- Description: Stored procedures and utility functions
-- =====================================================

-- =====================================================
-- GENERATE BOOKING REFERENCE
-- Creates unique booking reference like ELO-2025-001234
-- =====================================================
CREATE OR REPLACE FUNCTION generate_booking_ref()
RETURNS VARCHAR AS $$
DECLARE
    year_part VARCHAR(4);
    seq_num INTEGER;
    new_ref VARCHAR(20);
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    
    -- Get the next sequence number for this year
    SELECT COALESCE(MAX(
        CAST(SUBSTRING(booking_ref FROM 10 FOR 6) AS INTEGER)
    ), 0) + 1
    INTO seq_num
    FROM bookings
    WHERE booking_ref LIKE 'ELO-' || year_part || '-%';
    
    new_ref := 'ELO-' || year_part || '-' || LPAD(seq_num::TEXT, 6, '0');
    
    RETURN new_ref;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- AUTO-GENERATE BOOKING REF ON INSERT
-- =====================================================
CREATE OR REPLACE FUNCTION set_booking_ref()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.booking_ref IS NULL OR NEW.booking_ref = '' THEN
        NEW.booking_ref := generate_booking_ref();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_ref_trigger
    BEFORE INSERT ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION set_booking_ref();

-- =====================================================
-- CHECK ROOM AVAILABILITY
-- Returns true if room is available for given dates
-- =====================================================
CREATE OR REPLACE FUNCTION check_room_availability(
    p_room_id UUID,
    p_check_in DATE,
    p_check_out DATE,
    p_exclude_booking_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    conflict_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO conflict_count
    FROM bookings
    WHERE room_id = p_room_id
    AND status NOT IN ('cancelled')
    AND (p_exclude_booking_id IS NULL OR id != p_exclude_booking_id)
    AND (
        (check_in_date <= p_check_in AND check_out_date > p_check_in)
        OR (check_in_date < p_check_out AND check_out_date >= p_check_out)
        OR (check_in_date >= p_check_in AND check_out_date <= p_check_out)
    );
    
    RETURN conflict_count = 0;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- GET AVAILABLE ROOMS
-- Returns rooms available for given date range
-- =====================================================
CREATE OR REPLACE FUNCTION get_available_rooms(
    p_check_in DATE,
    p_check_out DATE,
    p_category VARCHAR DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    slug VARCHAR,
    type VARCHAR,
    category VARCHAR,
    price DECIMAL,
    images TEXT[],
    amenities TEXT[],
    capacity_adults INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        r.id,
        r.name,
        r.slug,
        r.type,
        r.category,
        r.price,
        r.images,
        r.amenities,
        r.capacity_adults
    FROM rooms r
    WHERE r.is_available = true
    AND (p_category IS NULL OR r.category = p_category)
    AND check_room_availability(r.id, p_check_in, p_check_out);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- CALCULATE BOOKING TOTAL
-- Calculates total with tax and discounts
-- =====================================================
CREATE OR REPLACE FUNCTION calculate_booking_total(
    p_room_rate DECIMAL,
    p_num_nights INTEGER,
    p_discount_percent DECIMAL DEFAULT 0
)
RETURNS TABLE (
    subtotal DECIMAL,
    tax_amount DECIMAL,
    discount_amount DECIMAL,
    total_amount DECIMAL
) AS $$
DECLARE
    v_subtotal DECIMAL;
    v_discount DECIMAL;
    v_tax_rate DECIMAL := 0.075; -- 7.5% VAT
    v_tax DECIMAL;
    v_total DECIMAL;
BEGIN
    v_subtotal := p_room_rate * p_num_nights;
    v_discount := v_subtotal * (p_discount_percent / 100);
    v_tax := (v_subtotal - v_discount) * v_tax_rate;
    v_total := v_subtotal - v_discount + v_tax;
    
    RETURN QUERY SELECT v_subtotal, v_tax, v_discount, v_total;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- CREATE BOOKING (Complete transaction)
-- =====================================================
CREATE OR REPLACE FUNCTION create_booking(
    p_room_id UUID,
    p_check_in DATE,
    p_check_out DATE,
    p_guest_email VARCHAR,
    p_guest_name VARCHAR,
    p_guest_phone VARCHAR,
    p_num_adults INTEGER DEFAULT 1,
    p_num_children INTEGER DEFAULT 0,
    p_special_requests TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    v_guest_id UUID;
    v_booking_id UUID;
    v_room_rate DECIMAL;
    v_num_nights INTEGER;
    v_subtotal DECIMAL;
    v_tax_amount DECIMAL;
    v_total_amount DECIMAL;
    v_booking_ref VARCHAR;
BEGIN
    -- Check availability first
    IF NOT check_room_availability(p_room_id, p_check_in, p_check_out) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Room is not available for selected dates'
        );
    END IF;
    
    -- Get room rate
    SELECT price INTO v_room_rate FROM rooms WHERE id = p_room_id;
    
    IF v_room_rate IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Room not found'
        );
    END IF;
    
    -- Calculate nights and totals
    v_num_nights := p_check_out - p_check_in;
    v_subtotal := v_room_rate * v_num_nights;
    v_tax_amount := v_subtotal * 0.075;
    v_total_amount := v_subtotal + v_tax_amount;
    
    -- Find or create guest
    SELECT id INTO v_guest_id FROM guests WHERE email = p_guest_email;
    
    IF v_guest_id IS NULL THEN
        INSERT INTO guests (email, first_name, last_name, phone)
        VALUES (
            p_guest_email,
            SPLIT_PART(p_guest_name, ' ', 1),
            COALESCE(NULLIF(TRIM(SUBSTRING(p_guest_name FROM POSITION(' ' IN p_guest_name))), ''), 'Guest'),
            p_guest_phone
        )
        RETURNING id INTO v_guest_id;
    END IF;
    
    -- Create booking
    INSERT INTO bookings (
        guest_id,
        room_id,
        check_in_date,
        check_out_date,
        num_adults,
        num_children,
        room_rate,
        subtotal,
        tax_amount,
        total_amount,
        guest_name,
        guest_email,
        guest_phone,
        special_requests,
        status,
        payment_status
    ) VALUES (
        v_guest_id,
        p_room_id,
        p_check_in,
        p_check_out,
        p_num_adults,
        p_num_children,
        v_room_rate,
        v_subtotal,
        v_tax_amount,
        v_total_amount,
        p_guest_name,
        p_guest_email,
        p_guest_phone,
        p_special_requests,
        'pending',
        'unpaid'
    )
    RETURNING id, booking_ref INTO v_booking_id, v_booking_ref;
    
    -- Update guest stats
    UPDATE guests 
    SET total_bookings = total_bookings + 1
    WHERE id = v_guest_id;
    
    RETURN json_build_object(
        'success', true,
        'booking_id', v_booking_id,
        'booking_ref', v_booking_ref,
        'total_amount', v_total_amount
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- CONFIRM BOOKING
-- =====================================================
CREATE OR REPLACE FUNCTION confirm_booking(
    p_booking_id UUID,
    p_admin_user_id UUID DEFAULT NULL
)
RETURNS JSON AS $$
BEGIN
    UPDATE bookings
    SET 
        status = 'confirmed',
        confirmed_by = p_admin_user_id,
        confirmed_at = NOW()
    WHERE id = p_booking_id
    AND status = 'pending';
    
    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Booking not found or already processed'
        );
    END IF;
    
    RETURN json_build_object(
        'success', true,
        'message', 'Booking confirmed successfully'
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- CANCEL BOOKING
-- =====================================================
CREATE OR REPLACE FUNCTION cancel_booking(
    p_booking_id UUID,
    p_reason TEXT DEFAULT NULL
)
RETURNS JSON AS $$
BEGIN
    UPDATE bookings
    SET 
        status = 'cancelled',
        cancelled_at = NOW(),
        cancellation_reason = p_reason
    WHERE id = p_booking_id
    AND status IN ('pending', 'confirmed');
    
    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Booking not found or cannot be cancelled'
        );
    END IF;
    
    RETURN json_build_object(
        'success', true,
        'message', 'Booking cancelled successfully'
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- RECORD PAYMENT
-- =====================================================
CREATE OR REPLACE FUNCTION record_payment(
    p_booking_id UUID,
    p_amount DECIMAL,
    p_payment_method VARCHAR,
    p_gateway VARCHAR DEFAULT 'manual',
    p_gateway_ref VARCHAR DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    v_payment_id UUID;
    v_booking_total DECIMAL;
    v_total_paid DECIMAL;
BEGIN
    -- Get booking total
    SELECT total_amount INTO v_booking_total FROM bookings WHERE id = p_booking_id;
    
    IF v_booking_total IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Booking not found');
    END IF;
    
    -- Create payment record
    INSERT INTO payments (
        booking_id,
        amount,
        payment_method,
        gateway,
        gateway_ref,
        status,
        paid_at
    ) VALUES (
        p_booking_id,
        p_amount,
        p_payment_method,
        p_gateway,
        p_gateway_ref,
        'successful',
        NOW()
    )
    RETURNING id INTO v_payment_id;
    
    -- Calculate total paid
    SELECT COALESCE(SUM(amount), 0) INTO v_total_paid
    FROM payments
    WHERE booking_id = p_booking_id AND status = 'successful';
    
    -- Update booking payment status
    UPDATE bookings
    SET payment_status = CASE
        WHEN v_total_paid >= v_booking_total THEN 'paid'
        WHEN v_total_paid > 0 THEN 'partial'
        ELSE 'unpaid'
    END
    WHERE id = p_booking_id;
    
    RETURN json_build_object(
        'success', true,
        'payment_id', v_payment_id,
        'total_paid', v_total_paid,
        'remaining', v_booking_total - v_total_paid
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- DASHBOARD STATS
-- Returns summary statistics for admin dashboard
-- =====================================================
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
    v_total_bookings INTEGER;
    v_pending_bookings INTEGER;
    v_today_checkins INTEGER;
    v_today_checkouts INTEGER;
    v_total_revenue DECIMAL;
    v_monthly_revenue DECIMAL;
    v_occupancy_rate DECIMAL;
    v_pending_inquiries INTEGER;
BEGIN
    -- Total bookings
    SELECT COUNT(*) INTO v_total_bookings FROM bookings;
    
    -- Pending bookings
    SELECT COUNT(*) INTO v_pending_bookings FROM bookings WHERE status = 'pending';
    
    -- Today's check-ins
    SELECT COUNT(*) INTO v_today_checkins 
    FROM bookings 
    WHERE check_in_date = CURRENT_DATE AND status IN ('confirmed', 'checked_in');
    
    -- Today's check-outs
    SELECT COUNT(*) INTO v_today_checkouts 
    FROM bookings 
    WHERE check_out_date = CURRENT_DATE AND status IN ('confirmed', 'checked_in');
    
    -- Total revenue
    SELECT COALESCE(SUM(amount), 0) INTO v_total_revenue 
    FROM payments WHERE status = 'successful';
    
    -- Monthly revenue
    SELECT COALESCE(SUM(amount), 0) INTO v_monthly_revenue 
    FROM payments 
    WHERE status = 'successful' 
    AND paid_at >= DATE_TRUNC('month', CURRENT_DATE);
    
    -- Pending inquiries
    SELECT COUNT(*) INTO v_pending_inquiries FROM inquiries WHERE status = 'new';
    
    RETURN json_build_object(
        'total_bookings', v_total_bookings,
        'pending_bookings', v_pending_bookings,
        'today_checkins', v_today_checkins,
        'today_checkouts', v_today_checkouts,
        'total_revenue', v_total_revenue,
        'monthly_revenue', v_monthly_revenue,
        'pending_inquiries', v_pending_inquiries
    );
END;
$$ LANGUAGE plpgsql;
