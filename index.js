import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();

// Provide a function that the store will call after every action it applies, when the state has potentially changed.
// Do this in startServer function. So need to give it the Redux store.
startServer(store);
