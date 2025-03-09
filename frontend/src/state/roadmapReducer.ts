import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Roadmap, ResourceData } from '../interfaces/form';

interface RoadmapState {
  roadmap: Roadmap;
  topics: string[];
  resources: ResourceData;
}

const initialState: RoadmapState = {
  roadmap: {
    topic: '',
    topics: [],
  },
  topics: [],
  resources: {
    topic: '',
    resources: [],
  },
};

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    createRoadmap(state, action: PayloadAction<Roadmap>) {
      state.roadmap = action.payload;
    },
    setTopics(state, action: PayloadAction<string[]>) {
      state.topics = action.payload;
    },
    createResources(state, action: PayloadAction<ResourceData>) {
      state.resources = action.payload;
    },
  },
});

export const { createRoadmap, setTopics, createResources } =
  roadmapSlice.actions;
export default roadmapSlice.reducer;
