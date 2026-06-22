"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const AUDIO_SRC = "/audio/shivsena_song.mp3";

let audioInstance: HTMLAudioElement | null = null;

function getAudioInstance(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  if (!audioInstance) {
    audioInstance = new Audio(AUDIO_SRC);
    audioInstance.loop = true;
    audioInstance.preload = "auto";
  }

  return audioInstance;
}

interface AudioContextValue {
  playing: boolean;
  toggle: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = getAudioInstance();
    if (!audio) return;

    const syncPlayingState = () => {
      setPlaying(!audio.paused);
    };

    audio.addEventListener("play", syncPlayingState);
    audio.addEventListener("pause", syncPlayingState);

    syncPlayingState();

    return () => {
      audio.removeEventListener("play", syncPlayingState);
      audio.removeEventListener("pause", syncPlayingState);
    };
  }, []);

  const toggle = useCallback(async () => {
    const audio = getAudioInstance();
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  }, []);

  return (
    <AudioContext.Provider value={{ playing, toggle }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}
