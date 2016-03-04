import {List} from 'immutable';

// return the result of setting state with an immutable List structure made out of whatever is passed in as entries
export function setEntries (state, entries) {
  return state.set('entries', List(entries));
}
