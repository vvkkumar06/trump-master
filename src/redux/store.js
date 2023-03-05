// export const store = {
//   teamCards: {},
//   galleryCards: {}
// }


import { configureStore } from '@reduxjs/toolkit';
import galleryCardsReducer from './features/gallery-slice';
import teamCardsReducer from './features/team-slice';

export default configureStore({
  reducer: {
    galleryCards: galleryCardsReducer,
    teamCards: teamCardsReducer
  },
})