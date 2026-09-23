export interface MusicTrack {
  id: string;
  name: string;
  mood: string;
  /** Placeholder / royalty-free audio only. No commercial copyrighted songs. */
  note: string;
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: "royal-celebration",
    name: "Royal Celebration",
    mood: "Shehnai · percussion · grand",
    note: "Royalty-free placeholder track for the MVP",
  },
  {
    id: "romantic-cinematic",
    name: "Romantic Cinematic",
    mood: "Strings · piano · soft swell",
    note: "Royalty-free placeholder track for the MVP",
  },
  {
    id: "traditional-wedding",
    name: "Traditional Wedding",
    mood: "Sitar · tabla · classical",
    note: "Royalty-free placeholder track for the MVP",
  },
  {
    id: "modern-love",
    name: "Modern Love",
    mood: "Minimal beats · warm pads",
    note: "Royalty-free placeholder track for the MVP",
  },
];

export const getTrack = (id: string) =>
  MUSIC_TRACKS.find((t) => t.id === id) ?? MUSIC_TRACKS[0];
