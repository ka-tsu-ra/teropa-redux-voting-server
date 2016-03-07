import {createStore} from 'redux';
import reducer from './reducer';

// store holds current state, and over time can receive actions that evolve the state
// from one version to the next, using the core app logic that is exposed through
// the reducer.

export default function makeStore() {
  return createStore(reducer);
}
