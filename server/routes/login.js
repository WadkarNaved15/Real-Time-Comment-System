const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { username } = req.body;
    const sessionId = `${username}-${Date.now()}`;
    res.json({ sessionId });
});

module.exports = router;
