"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  ListMusic,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, formatTime } from '@/lib/utils';
import { songs as initialSongs, type Song } from '@/lib/songs';

type RepeatMode = 'none' | 'all' | 'one';

export default function TVTunesPlayer() {
  const [playlist, setPlaylist] = useState<Song[]>(initialSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('none');
  const [isShuffled, setIsShuffled] = useState(false);

  const currentSong = useMemo(() => playlist[currentSongIndex], [playlist, currentSongIndex]);

  const shufflePlaylist = useCallback(() => {
    const shuffled = [...initialSongs].sort(() => Math.random() - 0.5);
    setPlaylist(shuffled);
    setCurrentSongIndex(0);
    setProgress(0);
  }, []);

  const unshufflePlaylist = useCallback(() => {
    setPlaylist(initialSongs);
    const newIndex = initialSongs.findIndex(song => song.id === currentSong?.id)
    setCurrentSongIndex(newIndex > -1 ? newIndex : 0);
    setProgress(0);
  }, [currentSong]);

  const handleNextSong = useCallback(() => {
    if (isShuffled) {
      setCurrentSongIndex(Math.floor(Math.random() * playlist.length));
      setProgress(0);
      return;
    }
    
    if (repeatMode === 'one') {
      setProgress(0);
      setIsPlaying(true);
    } else if (currentSongIndex === playlist.length - 1) { // is last song
      if (repeatMode === 'all') {
        setCurrentSongIndex(0);
        setProgress(0);
      } else {
        setIsPlaying(false);
      }
    } else {
      setCurrentSongIndex(prev => prev + 1);
      setProgress(0);
    }
  }, [currentSongIndex, playlist.length, repeatMode, isShuffled]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && progress < currentSong.duration) {
      timer = setInterval(() => {
        setProgress(p => p + 1);
      }, 1000);
    } else if (progress >= currentSong.duration) {
      handleNextSong();
    }
    return () => clearInterval(timer);
  }, [isPlaying, progress, currentSong.duration, handleNextSong]);
  
  const handlePlayPause = () => {
    if (progress >= currentSong.duration) {
      setProgress(0);
    }
    setIsPlaying(prev => !prev);
  };

  const handlePrevSong = () => {
    if (progress > 3) {
      setProgress(0);
    } else {
      setCurrentSongIndex(prev => (prev === 0 ? playlist.length - 1 : prev - 1));
      setProgress(0);
    }
  };
  
  const handleSelectSong = (index: number) => {
    setCurrentSongIndex(index);
    setProgress(0);
    setIsPlaying(true);
  };

  const toggleShuffle = () => {
    setIsShuffled(prev => {
      const newShuffleState = !prev;
      if (newShuffleState) {
        shufflePlaylist();
      } else {
        unshufflePlaylist();
      }
      return newShuffleState;
    });
  };

  const toggleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 'none') return 'all';
      if (prev === 'all') return 'one';
      return 'none';
    });
  };

  const handleSeek = (value: number[]) => {
    setProgress(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  }

  const VolumeIcon = useMemo(() => {
    if (isMuted || volume === 0) return VolumeX;
    if (volume < 0.5) return Volume1;
    return Volume2;
  }, [isMuted, volume]);

  return (
    <div className="flex h-full w-full items-center justify-center p-4 lg:p-8">
      <div className="flex h-full w-full max-w-[1400px] flex-col overflow-hidden rounded-xl bg-card shadow-2xl md:flex-row aspect-video">
        <div className="flex w-full flex-col border-b md:w-2/5 md:border-b-0 md:border-r lg:w-1/3">
          <div className="flex items-center gap-2 p-4 border-b">
            <ListMusic className="h-6 w-6" />
            <h2 className="font-headline text-xl font-bold tracking-tight">
              Playlist
            </h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {playlist.map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => handleSelectSong(index)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-md p-3 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    index === currentSongIndex && "bg-accent text-accent-foreground hover:bg-accent/90"
                  )}
                >
                  <Image
                    src={song.albumArt.imageUrl}
                    alt={`Album art for ${song.title}`}
                    width={48}
                    height={48}
                    className="rounded-md"
                    data-ai-hint={song.albumArt.imageHint}
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-semibold">{song.title}</p>
                    <p className={cn("truncate text-sm", index === currentSongIndex ? 'text-accent-foreground/80' : 'text-muted-foreground')}>{song.artist}</p>
                  </div>
                  <span className={cn("text-sm", index === currentSongIndex ? 'text-accent-foreground/80' : 'text-muted-foreground')}>
                    {formatTime(song.duration)}
                  </span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10">
          <div className="flex w-full flex-col items-center text-center">
            <div className="relative mb-6 aspect-square w-full max-w-sm">
               <Image
                src={currentSong.albumArt.imageUrl}
                alt={`Album art for ${currentSong.title}`}
                fill
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint={currentSong.albumArt.imageHint}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h1 className="font-headline text-3xl font-bold leading-tight tracking-tighter lg:text-4xl">
              {currentSong.title}
            </h1>
            <p className="text-lg text-muted-foreground lg:text-xl">
              {currentSong.artist}
            </p>
          </div>

          <div className="w-full max-w-xl">
            <div className="flex items-center gap-3">
              <span className="w-12 text-center text-sm text-muted-foreground">{formatTime(progress)}</span>
              <Slider
                value={[progress]}
                max={currentSong.duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <span className="w-12 text-center text-sm text-muted-foreground">{formatTime(currentSong.duration)}</span>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleShuffle}
                className={cn("h-12 w-12", isShuffled && "text-primary")}
                aria-label="Shuffle"
              >
                <Shuffle className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handlePrevSong} className="h-16 w-16" aria-label="Previous song">
                <SkipBack className="h-8 w-8" />
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={handlePlayPause}
                className="h-20 w-20 rounded-full shadow-lg"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10 pl-1" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextSong} className="h-16 w-16" aria-label="Next song">
                <SkipForward className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRepeat}
                className={cn("h-12 w-12", repeatMode !== 'none' && "text-primary")}
                aria-label="Repeat"
              >
                {repeatMode === 'one' ? <Repeat1 className="h-6 w-6" /> : <Repeat className="h-6 w-6" />}
              </Button>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-3">
               <Button variant="ghost" size="icon" onClick={toggleMute} aria-label="Mute">
                <VolumeIcon className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-full max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
