const io = require('socket.io')(8000, {
    cors: {
      origin: "http://127.0.0.1:5500",  // Replace with your client origin
      methods: ["GET", "POST"]
    }
  });
  
  const users = {};
  
  io.on('connection', socket => {
      // When a new user joins, save their username and broadcast the event
      socket.on('new-user-joined', username => {
          users[socket.id] = username;
          socket.broadcast.emit('user-joined', username);
      });
  
      // Handle message sending
      socket.on('send', message => {
          socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
      });
  
      // Handle user disconnection
      socket.on('disconnect', message => {
          socket.broadcast.emit('user-left', users[socket.id]);
          delete users[socket.id];
      });
  });
  