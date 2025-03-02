export interface RoadMapFormData {
  learningTopic: string;
  timeCommitment: string;
  frequency: string;
  timeFrame: string;
  deadline?: string;
  visual?: boolean;
  auditory?: boolean;
  kinesthetic?: boolean;
}

interface Roadmap {
  topic: string;
  schedule: {
    frequencyPattern: string[];
    sessionDuration: string;
  };
}

interface Resource {
  title: string;
  type: string;
  url: string;
  cost: string;
  duration: string;
  learning_style: string[];
}

interface Day {
  day: string;
  date: string;
  topics: string[];
  resources: Resource[];
}

interface Week {
  week_number: number;
  focus_area: string;
  days: Record<string, Day>;
}

export interface Roadmapdata {
  roadmap: Roadmap;
  weeks: Week[];
}
