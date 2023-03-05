import { createSlice } from '@reduxjs/toolkit';

export const teamCardsSlice = createSlice({
  name: 'teamCards',
  initialState: {
    player1: 123,
    player2: undefined,
    player3: undefined,
    player4: undefined,
    player5: 154
  },
  reducers: {
    removeFromTeam: (state, action) => {
      state[`player${action.payload.playerId}`] = undefined;
    },
    addToTeam: (state, action) => {
      state[action.payload.playerId] = action.payload.id;
    }
  }
});
export const { removeFromTeam, addToTeam } = teamCardsSlice.actions;
export default teamCardsSlice.reducer;