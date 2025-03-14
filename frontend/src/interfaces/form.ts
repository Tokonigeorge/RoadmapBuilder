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

// interface Roadmap {
//   topic: string;
//   schedule: {
//     frequencyPattern: string[];
//     sessionDuration: string;
//   };
// }

// interface Resource {
//   title: string;
//   type: string;
//   url: string;
//   cost: string;
//   duration: string;
//   learning_style: string[];
// }

// interface Day {
//   day: string;
//   date: string;
//   topics: string[];
//   resources: Resource[];
// }

// interface Week {
//   week_number: number;
//   focus_area: string;
//   days: Day[];
// }

// export interface Roadmapdata {
//   roadmap: Roadmap;
//   weeks: Week[];
// }

export interface Resource {
  title: string;
  type: string;
  url: string;
  cost: string;
  duration: string;
  learning_style: string[];
}

export interface Topic {
  title: string;
  milestone: string;
  prerequisite_topic: string;
  optional: string;
  resources: Resource[];
}

export interface Roadmap {
  topic: string;
  topics: Topic[];
}

export interface ResourceData {
  topic: string;
  resources: Resource[];
}
