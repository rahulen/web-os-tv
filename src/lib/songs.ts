import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type Song = {
  id: number;
  title: string;
  artist: string;
  duration: number; // in seconds
  albumArt: ImagePlaceholder;
};

const findImage = (id: string): ImagePlaceholder => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  if (!img) {
    return {
      id: 'fallback',
      imageUrl: 'https://picsum.photos/seed/fallback/500/500',
      description: 'fallback album art',
      imageHint: 'abstract music'
    };
  }
  return img;
};

export const songs: Song[] = [
  {
    id: 1,
    title: "Midnight City",
    artist: "M83",
    duration: 243,
    albumArt: findImage('album-art-1'),
  },
  {
    id: 2,
    title: "Electric Feel",
    artist: "MGMT",
    duration: 229,
    albumArt: findImage('album-art-2'),
  },
  {
    id: 3,
    title: "Walking On A Dream",
    artist: "Empire of the Sun",
    duration: 196,
    albumArt: findImage('album-art-3'),
  },
  {
    id: 4,
    title: "Genesis",
    artist: "Grimes",
    duration: 255,
    albumArt: findImage('album-art-4'),
  },
  {
    id: 5,
    title: "Shelter",
    artist: "Porter Robinson & Madeon",
    duration: 219,
    albumArt: findImage('album-art-5'),
  },
  {
    id: 6,
    title: "Oblivion",
    artist: "Grimes",
    duration: 251,
    albumArt: findImage('album-art-6'),
  }
];
