import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const cricketSlice = createSlice({
  name: 'cricketCards',
  initialState,
  reducers: {
    updateCricketCards: (state, action) => {
      state.data = action.payload
    },
    //@Info action : { tmid : number, slotId: string}
    addToTeam: (state, action) => {
      let { backupCards, playingCards } = state.data;
      const { tmId, slotId } = action.payload;
      backupCards[tmId].count = backupCards[tmId].count - 1;
      playingCards[slotId] = tmId;
      state = { backupCards, playingCards};
    },
    //@Info action : { tmid : number, cardId: string}
    removeFromTeam: (state, action) => {
      let { backupCards, playingCards } = state.data;
      const { tmId, slotId } = action.payload;
      if(!backupCards[tmId]) {
        backupCards[tmId] = {};
      }
      backupCards[tmId].count = backupCards[tmId].count + 1;
      playingCards[slotId] = undefined;
      state = { backupCards, playingCards};
    },
  }
});

export const { addToTeam, removeFromTeam, updateCricketCards } = cricketSlice.actions;

export default cricketSlice.reducer;
