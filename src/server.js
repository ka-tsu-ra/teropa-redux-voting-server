import Server from 'socket.io';

// Create a Socket.io server and regular HTTP server bound to port 8090.
// Can be any port number but needs to match port you use to connect from clients.
// Index.js can call this function, so a server is started when the app starts.

export default function startServer() {
  const io = new Server().attach(8090);
}
