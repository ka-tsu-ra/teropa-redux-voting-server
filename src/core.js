import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries (state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}

// Only need to update the part of the state that has to do with the tally.
// Leave the rest of the state Map out of it. Saying voteState as the arg instead of
// state makes that more obvious. Reducer fn has to update that part of the state and make it 
// equal to the outcome of this function when you pass it the right part of the state, i.e. the voteState.
// NB if the value at the end is missing, this initialises it with 0.
export function vote(voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else                      return [a,b];
}
