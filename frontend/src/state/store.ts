import { configureStore } from '@reduxjs/toolkit';
import roadmapReducer from './roadmapReducer';

const store = configureStore({
  reducer: {
    roadmap: roadmapReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
