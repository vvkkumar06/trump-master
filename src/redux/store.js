import { configureStore } from '@reduxjs/toolkit';
import { cricketApi } from './features/cricket-slice';

export default configureStore({
  reducer: {
    [cricketApi.reducerPath]: cricketApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cricketApi.middleware),
})