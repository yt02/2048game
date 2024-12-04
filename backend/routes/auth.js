const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const router = express.Router();

// Login user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        res.status(200).json({ message: 'Login successful', username: user.username });
    });
});

// Register user
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to register user.' });
        }
        res.status(200).json({ message: 'Registration successful.' });
    });
});

module.exports = router;
