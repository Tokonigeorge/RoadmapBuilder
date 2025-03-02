import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Roadmapdata } from '../interfaces/form';

interface RoadmapState {
  roadmaps: Roadmapdata;
}

const initialState: RoadmapState = {
  roadmaps: {
    roadmap: {
      topic: '',
      schedule: {
        frequencyPattern: [],
        sessionDuration: '',
      },
    },
    weeks: [],
  },
};

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    createRoadmap(state, action: PayloadAction<Roadmapdata>) {
      state.roadmaps = action.payload;
    },
  },
});

export const { createRoadmap } = roadmapSlice.actions;
export default roadmapSlice.reducer;
