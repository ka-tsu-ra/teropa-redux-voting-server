import {List, Map} from 'immutable';

// return the result of setting state with an immutable List structure made out of whatever is passed in as entries
export function setEntries (state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}

// updateIn here: reach into the nested data structure path ['vote', 'tally', 'Trainspotting'] and apply this function there.
// If the keys are missing along the path, create new Maps in their place. If the value at the end is missing, initialize it with 0.
export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
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
