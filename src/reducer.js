import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      // Update will return a new map having udpated the value at the key you give - i.e. 'vote'
      // So will only work on that part of the map and just copy the rest of it.
      return state.update('vote',
                          voteState => vote(voteState, action.entry));
    }
    return state;
}
