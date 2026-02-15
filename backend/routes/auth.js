
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            // Use a generic message to prevent email enumeration
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            // In a production app, you would create a session or JWT here.
            res.json({ success: true, message: 'Login successful.' });
        } else {
            res.status(401).json({ message: 'Invalid credentials.' });
        }

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
});

module.exports = router;
