const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);
const io = new Server(server , {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

//this code will identify the connected user
io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);


    socket.on('joinRoom', (data) => {
        socket.join(data)
        console.log(`a user joined room: ${data}`)
    })

    socket.on('sendMessage', (data) => {

        socket.emit('resendMessage', data)
        // socket.to(data.room).emit('resendMessage', data)
        console.log(data)
    })

})

// this is the server port
server.listen(4000, () => {
    console.log('Server is running on port 4000');
});