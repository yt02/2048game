// backend/routes/settings.js
const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.post("/update", (req, res) => {
    const { currentUsername, newUsername, newPassword } = req.body;

    const sql = `
        UPDATE Users 
        SET username = ?, password = ? 
        WHERE username = ?
    `;
    db.query(sql, [newUsername, newPassword, currentUsername], (err) => {
        if (err) {
            res.status(500).json({ error: "Failed to update user info." });
        } else {
            res.json({ message: "User info updated successfully." });
        }
    });
});

module.exports = router;
