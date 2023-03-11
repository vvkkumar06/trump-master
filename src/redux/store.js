import { configureStore } from '@reduxjs/toolkit';
import { api } from './features/api';
import cricketCardsReducer from './features/cricket-slice';
import userReducer from './features/user-slice';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cricketCards: cricketCardsReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})