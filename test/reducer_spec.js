import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });


  it('handles the SET_ENTRIES action', () => {
    const initialState = Map();
    const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']  
    }));
  });

  it('handles the NEXT action', () => {
    const currentState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });
    const action = { type: 'NEXT' };
    const nextState = reducer(currentState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }));
  });

  it('handles the VOTE action', () => {
    const currentState = fromJS({
      entries: [],
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      }
    });
    const action = { type: 'VOTE', entry: 'Trainspotting' };
    const nextState = reducer(currentState, action);

    expect(nextState).to.equal(fromJS({
      entries: [],
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: { Trainspotting: 1 }
    // NB also works with quotation marks - tally: { 'Trainspotting': 1}
      }
    }));
  });
});


