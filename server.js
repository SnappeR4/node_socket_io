// server.js  →  node server.js
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('client connected:', socket.id);

  const interval = setInterval(() => {
    const productId = String(Math.floor(Math.random() * 5) + 1); // "1".."5"
    const price = +(Math.random() * 2000 + 50).toFixed(2);
    socket.emit('priceUpdate', { productId, price });
  }, 1000);

  socket.on('disconnect', () => clearInterval(interval));
});

server.listen(3000, () => console.log('Socket.IO on :3000'));