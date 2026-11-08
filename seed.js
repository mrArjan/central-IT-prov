const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function seedAdmin() {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        // Upsert user (inserts or updates existing email record)
        const { data, error } = await supabase.from('users').upsert(
            [{ name: 'Arjan Tirado', email: 'admin@centralit.com', password: hashedPassword, role: 'ADMIN' }],
            { onConflict: 'email' }
        ).select();

        if (error) {
            console.error('Seeding Error:', error.message);
        } else {
            console.log('SUCCESS: Admin user created/reset!');
            console.log('Email: admin@centralit.com');
            console.log('Password: admin123');
        }
    } catch (err) {
        console.error('Execution Error:', err.message);
    }
}

seedAdmin();