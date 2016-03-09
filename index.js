import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();

// Provide a function that the store will call after every action it applies, when the state has potentially changed.
// Do this in startServer function. So need to give it the Redux store.
startServer(store);

// Load some test entries into the store from a test file. Dispatch the NEXT action to start the vote.
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
