import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTime, getBook } from "../api";
import { Skeleton } from "../components/Skeleton";
import type { Book } from "../types";

export function PlayerPage() {
  const { id = "" } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    getBook(id, controller.signal)
      .then(setBook)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError("This audiobook could not be loaded.");
      });
    return () => controller.abort();
  }, [id]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play();
    else audio.pause();
  };

  const seekBy = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration || 0, audio.currentTime + seconds));
  };

  const seekTo = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  if (error) return <div className="page-error">{error}</div>;
  if (!book) return <div className="content-page"><Skeleton className="player-page-skeleton" /></div>;

  return (
    <div className="content-page player-page">
      <h1>{book.title}</h1>
      <div className="player-summary">{book.summary}</div>
      <audio
        ref={audioRef}
        src={book.audioLink}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      />
      <div className="audio-player" aria-label={`Audio player for ${book.title}`}>
        <div className="audio-book">
          <img src={book.imageLink} alt="" />
          <span><strong>{book.title}</strong><small>{book.author}</small></span>
        </div>
        <div className="audio-controls">
          <button onClick={() => seekBy(-10)} aria-label="Rewind 10 seconds"><RotateCcw /></button>
          <button className="play-button" onClick={togglePlayback} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
          </button>
          <button onClick={() => seekBy(10)} aria-label="Forward 10 seconds"><RotateCw /></button>
        </div>
        <div className="audio-timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            aria-label="Audio progress"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => seekTo(Number(event.target.value))}
            style={{ "--progress": duration ? `${(currentTime / duration) * 100}%` : "0%" } as React.CSSProperties}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
