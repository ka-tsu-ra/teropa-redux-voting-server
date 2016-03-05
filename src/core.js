import {List, Map} from 'immutable';

// return the result of setting state with an immutable List structure made out of whatever is passed in as entries
export function setEntries (state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries');
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}

