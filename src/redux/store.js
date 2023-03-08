import { configureStore } from '@reduxjs/toolkit';
import { api } from './features/api';
import cricketCardsReducer from './features/cricket-slice';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cricketCards: cricketCardsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})