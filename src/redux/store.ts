import { configureStore } from '@reduxjs/toolkit';
import { dataSlice } from './appData';

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
