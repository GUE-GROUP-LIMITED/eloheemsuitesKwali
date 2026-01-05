-- =====================================================
-- CREATE ADMIN USER
-- Run this in Supabase SQL Editor AFTER creating an auth user
-- =====================================================

-- STEP 1: First, you need to create a user in Supabase Authentication
-- Go to: Supabase Dashboard > Authentication > Users > Add User
-- Create a user with email: admin@eloheemsuits.com (or your preferred email)
-- Save the password you set

-- STEP 2: After creating the auth user, get their UUID from the Users table
-- It will look like: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

-- STEP 3: Run this SQL (replace the UUID with your actual user's UUID)
INSERT INTO admin_users (
    auth_user_id,
    email,
    full_name,
    role,
    phone,
    is_active
) VALUES (
    -- REPLACE THIS with the UUID from Supabase Auth Users table
    '969bba1e-19b1-4d1f-b97e-bc626f778765',
    
    -- Admin email (should match the auth user email)
    'admin@eloheemsuits.com',
    
    -- Full name
    'Eloheem Admin',
    
    -- Role: 'super_admin', 'admin', 'manager', or 'staff'
    'super_admin',
    
    -- Phone (optional)
    '+234 81818182',
    
    -- Is active
    true
);

-- =====================================================
-- QUICK VERSION (if you already have the UUID)
-- Just copy this and replace the values:
-- =====================================================

/*
INSERT INTO admin_users (auth_user_id, email, full_name, role, is_active)
VALUES (
    'paste-your-uuid-here',
    'your-email@example.com',
    'Your Name',
    'super_admin',
    true
);
*/

-- =====================================================
-- TO VERIFY: Check if admin was created
-- =====================================================
-- SELECT * FROM admin_users;
