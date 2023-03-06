import { createSlice } from '@reduxjs/toolkit';

export const galleryCardsSlice = createSlice({
  name: 'galleryCards',
  initialState: {
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
    },
    15: {
      count: 1
    },
    4: {
      count: 2
    }
  },
  reducers: {
    removeFromGallery: (state, action) => {
      Object.keys(state).map(id => {
        if(action.payload.id == id){
          state[id].count = state[id].count - 1;
        }
      });
    },
    addToGallery: (state, action) => {
      if(state[action.payload.id]){
        state[action.payload.id].count = state[action.payload.id].count + 1;
      } else {
        state[action.payload.id] = { count: 1};
      }
    }
  }
});
export const { removeFromGallery, addToGallery } = galleryCardsSlice.actions;
export default galleryCardsSlice.reducer;