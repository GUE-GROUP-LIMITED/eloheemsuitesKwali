// Supabase Edge Function: Contact Form Handler
// Handles contact form submissions and sends notifications

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactRequest {
    name: string
    email: string
    phone?: string
    subject?: string
    message: string
    inquiry_type?: string
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const supabase = createClient(supabaseUrl, supabaseKey)

        const body: ContactRequest = await req.json()

        // Validate required fields
        if (!body.name || !body.email || !body.message) {
            return new Response(
                JSON.stringify({ success: false, error: 'Name, email, and message are required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(body.email)) {
            return new Response(
                JSON.stringify({ success: false, error: 'Invalid email format' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Insert inquiry
        const { data, error } = await supabase
            .from('inquiries')
            .insert({
                name: body.name,
                email: body.email,
                phone: body.phone || null,
                subject: body.subject || 'General Inquiry',
                message: body.message,
                inquiry_type: body.inquiry_type || 'general',
                status: 'new'
            })
            .select()
            .single()

        if (error) {
            console.error('Error saving inquiry:', error)
            return new Response(
                JSON.stringify({ success: false, error: 'Failed to submit inquiry' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Send notification email to admin (could integrate with email service)
        console.log('New inquiry from:', body.name, body.email)
        console.log('Subject:', body.subject)
        console.log('Message:', body.message)

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Thank you for your message. We will get back to you shortly.',
                inquiry_id: data.id
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error('Unexpected error:', error)
        return new Response(
            JSON.stringify({ success: false, error: 'An unexpected error occurred' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
