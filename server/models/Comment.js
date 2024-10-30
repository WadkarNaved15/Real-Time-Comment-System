const db = require('../db/connection');

const Comment = {
    getAll: (callback) => {
        db.query('SELECT * FROM comments ORDER BY timestamp DESC', callback);
    },
    add: (username, comment, callback) => {
        db.query('INSERT INTO comments (username, comment) VALUES (?, ?)', [username, comment], callback);
    }
};

module.exports = Comment;
