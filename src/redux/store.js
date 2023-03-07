import { configureStore } from '@reduxjs/toolkit';
import { cricketApi } from './features/cricket-slice';
import galleryCardsReducer from './features/gallery-slice';
import teamCardsReducer from './features/team-slice';

export default configureStore({
  reducer: {
    galleryCards: galleryCardsReducer,
    teamCards: teamCardsReducer,
    [cricketApi.reducerPath]: cricketApi.reducer,
  }
})