import _ from 'lodash';
import allCricketPlayers from '../../data/cricket-players';
import { store } from './store';
import { findVacantPlayer } from './team-reducer';

export const initialGalleryCardsState = {
  1: {
    count: 5
  },
  5: {
    count: 1
  },
  7: {
    count: 2
  },
  112: {
    count: 2
  },
  115: {
    count: 1
  },
  199: {
    count: 1
  },
  203: {
    count: 4
  }
}

export const cardsReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE":
      let newState = _.cloneDeep(state);
      Object.keys(state).map(id => {
        if(action.id == id){
          newState[id].count = newState[id].count - 1;
          // findVacantPlayer()
        }
      });
      return newState;
    default:
      return state;
  }
};

export const transformGalleryCardStateToList = (data) => {
  let galleryItems = [];
  Object.keys(data).forEach(key => {
    for(let i=0; i<data[key].count; i++) {
      galleryItems.push(allCricketPlayers.find(item => item.TMID == key));
    }
  });
  return galleryItems;
}