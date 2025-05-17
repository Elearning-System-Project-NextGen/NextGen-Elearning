const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

class SocketManager {
  static setup(server) {
    const io = socketIo(server, { cors: { origin: '*' } });
    io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication error'));
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error('Authentication error'));
        socket.user = decoded;
        next();
      });
    });

    io.on('connection', (socket) => {
      socket.join(socket.user.id);
      socket.on('chat message', async (msg) => {
        const message = new Message({
          sender_id: socket.user.id,
          receiver_id: msg.receiver_id,
          message: msg.text,
          timestamp: new Date()
        });
        await message.save();
        io.to(msg.receiver_id).emit('chat message', message);
      });
    });
  }
}

module.exports = SocketManager;