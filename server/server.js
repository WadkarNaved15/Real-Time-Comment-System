const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./db/connection');
const loginRoute = require('./routes/login');
const commentsRoute = require('./routes/Comments');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/api/login', loginRoute);
app.use('/api/comments', commentsRoute(io));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
