import Server from 'socket.io';

// Create a Socket.io server and regular HTTP server bound to port 8090.
// Can be any port number but needs to match port you use to connect from clients.

// Index.js can call this function, so a server is started when the app starts.

// Server needs to let clients know about changes in app state. Redux lets you subscribe to the store by providing a function the store will call after every action it applies.

// Give the store to the startServer function, and subscribe a listener to the store that reads the current state, turns it into a plain JS object, and emits it as a state event on the Socket.io server.
// So a JSON-serialized snapshot of the state is sent over all active Socket.io connections.

// NB startServer fn is called from index.js so pass the store to it in there in the call as well.
// Would optimise to not send the whole state every time.

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())    
  );

// Plus server should give clients the current state immediately when thye connect to the app. Then they can sync their client-side state with the latest server-side state straight away.
// This listens for connection event and emits the state when that happens.
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS()
  }
}
