const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const PORT = process.env.PORT || 3000;

let users = [];
let connections = [];

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', socket => {
    connections.push(socket);
    console.log(`Connections: ${connections.length}`);

    //Disconnect
    socket.on('disconnect', () => {
        if(!socket.username) {
            return
        }

        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log(`Disconected: ${connections.length} sockets connected`);
    })

    socket.on('send message', data => {
        console.log(data);
        io.sockets.emit('new message', {msg: data, user: socket.username})
    })


    socket.on('new user', (newUser, cb) => {
        cb(true);

        socket.username = newUser;
        users.unshift(socket.username);

        updateUsernames();
    });

    function updateUsernames() {
        io.sockets.emit('get users', users);
    }
});