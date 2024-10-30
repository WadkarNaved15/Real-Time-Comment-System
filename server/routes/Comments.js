// comments.js
const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

const db = require('../db/connection');

module.exports = (io) => {
    router.get('/', (req, res) => {
        Comment.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    });

    router.post('/', (req, res) => {
        const { username, comment } = req.body;
        const timestamp = new Date();

        db.query('INSERT INTO comments (username, comment, timestamp) VALUES (?, ?, ?)', [username, comment, timestamp], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const newComment = { id: result.insertId, username, comment, timestamp };

            io.emit('newComment', newComment);

            res.json(newComment);
        });
    });

    return router;
};
