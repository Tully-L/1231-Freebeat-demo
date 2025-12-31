export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumArt: string;
  audioUrl: string;
  remixCount?: number;
}

// Free sample audio files with CORS support from various sources
const SAMPLE_AUDIO_URLS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
] as const;

export const trendingSongs: Song[] = [
  {
    id: "1",
    title: "The Fate of Ophelia",
    artist: "Taylor Swift",
    duration: 272,
    albumArt: "https://picsum.photos/seed/album1/300/300",
    audioUrl: SAMPLE_AUDIO_URLS[0],
    remixCount: 255,
  },
  {
    id: "2",
    title: "MUTT",
    artist: "Leon Thomas",
    duration: 272,
    albumArt: "https://picsum.photos/seed/album2/300/300",
    audioUrl: SAMPLE_AUDIO_URLS[1],
    remixCount: 226,
  },
  {
    id: "3",
    title: "Man I Need",
    artist: "Olivia Dean",
    duration: 264,
    albumArt: "https://picsum.photos/seed/album3/300/300",
    audioUrl: SAMPLE_AUDIO_URLS[2],
    remixCount: 122,
  },
  {
    id: "4",
    title: "All I Want for Christmas Is You",
    artist: "Mariah Carey",
    duration: 235,
    albumArt: "https://picsum.photos/seed/album4/300/300",
    audioUrl: SAMPLE_AUDIO_URLS[3],
    remixCount: 95,
  },
  {
    id: "5",
    title: "Rockin' Around The Christmas Tree",
    artist: "Brenda Lee",
    duration: 253,
    albumArt: "https://picsum.photos/seed/album5/300/300",
    audioUrl: SAMPLE_AUDIO_URLS[4],
    remixCount: 78,
  },
  {
    id: "6",
    title: "Last Christmas",
    artist: "Wham!",
    duration: 235,
    albumArt: "https://picsum.photos/seed/album6/300/300",
    audioUrl: SAMPLE_AUDIO_URLS[5],
    remixCount: 56,
  },
  {
    id: "7",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: 200,
    albumArt: "https://picsum.photos/seed/album7/300/300",
    audioUrl: SAMPLE_AUDIO_URLS[6],
    remixCount: 189,
  },
  {
    id: "8",
    title: "Levitating",
    artist: "Dua Lipa",
    duration: 203,
    albumArt: "https://picsum.photos/seed/album8/300/300",
    audioUrl: SAMPLE_AUDIO_URLS[7],
    remixCount: 167,
  },
];

export const chartCategories = [
  { id: "billboard", label: "Billboard hot 100" },
  { id: "frequency", label: "This is Frequency" },
  { id: "friday", label: "New Music Friday" },
  { id: "2025", label: "New Music 2025" },
  { id: "global", label: "Global Charts" },
] as const;

export type ChartCategory = (typeof chartCategories)[number]["id"];

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
