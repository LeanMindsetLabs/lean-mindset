export type Playlist = {
  id: string;
  title: string;
  mood: string;
  tracks: number;
  minutes: number;
  vibe: string;
  gradient: string;
};

export const playlists: Playlist[] = [
  {
    id: "ignite",
    title: "Ignite",
    mood: "HIIT / Power",
    tracks: 18,
    minutes: 42,
    vibe: "High BPM drops for circuit days",
    gradient: "linear-gradient(135deg,#2a0800,#ff6b00)",
  },
  {
    id: "steady-state",
    title: "Steady State",
    mood: "Walk + Core",
    tracks: 22,
    minutes: 55,
    vibe: "Mid-tempo focus for foundation weeks",
    gradient: "linear-gradient(145deg,#0a1a2a,#1a4a6a,#ff8533)",
  },
  {
    id: "mobility-flow",
    title: "Mobility Flow",
    mood: "Recovery",
    tracks: 12,
    minutes: 28,
    vibe: "Soft pulse for stretch & reset",
    gradient: "linear-gradient(150deg,#1a1020,#3a2050,#ff6b00)",
  },
  {
    id: "kitchen-prep",
    title: "Kitchen Prep",
    mood: "Meal prep",
    tracks: 16,
    minutes: 40,
    vibe: "Upbeat grooves while you batch Meal 2–4",
    gradient: "linear-gradient(130deg,#0a2a14,#1a4a28,#ff6b00)",
  },
  {
    id: "deep-focus",
    title: "Deep Focus",
    mood: "Desk / NEAT",
    tracks: 20,
    minutes: 60,
    vibe: "Low distraction for walk-meeting days",
    gradient: "linear-gradient(140deg,#121212,#2a2a2a,#ff6b00)",
  },
  {
    id: "sunday-reset",
    title: "Sunday Reset",
    mood: "Weekly review",
    tracks: 14,
    minutes: 35,
    vibe: "Calm energy for reflection + grocery run",
    gradient: "linear-gradient(135deg,#1a1408,#3a2810,#ff8533)",
  },
];

export const musicMoods = [
  "All",
  "HIIT / Power",
  "Walk + Core",
  "Recovery",
  "Meal prep",
  "Desk / NEAT",
  "Weekly review",
] as const;
