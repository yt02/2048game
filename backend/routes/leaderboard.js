// backend/routes/leaderboard.js
const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res) => {
    const sql = `
        SELECT Users.username, Leaderboard.score 
        FROM Leaderboard 
        JOIN Users ON Leaderboard.user_id = Users.id 
        ORDER BY score DESC 
        LIMIT 10
    `;
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Failed to fetch leaderboard." });
        } else {
            res.json(results);
        }
    });
});

router.post("/update", (req, res) => {
    const { username, score } = req.body;

    const getUserSql = "SELECT id FROM Users WHERE username = ?";
    db.query(getUserSql, [username], (err, results) => {
        if (err || results.length === 0) {
            res.status(400).json({ error: "User not found." });
            return;
        }

        const userId = results[0].id;
        const updateScoreSql = `
            INSERT INTO Leaderboard (user_id, score)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE score = GREATEST(score, VALUES(score))
        `;
        db.query(updateScoreSql, [userId, score], (err) => {
            if (err) {
                res.status(500).json({ error: "Failed to update score." });
            } else {
                res.json({ message: "Score updated successfully." });
            }
        });
    });
});

module.exports = router;
