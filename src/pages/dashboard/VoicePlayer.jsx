import { useState, useRef, useEffect } from "react";
import { Play, Pause, ThumbsUp, ThumbsDown, Download } from "lucide-react";
import toast from "react-hot-toast";

export default function VoicePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl flex items-center space-x-4 shadow-md w-full">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700 transition"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {/* Voice Info & Seek Bar */}
      <div className="flex-1">
        <p className="text-white text-sm font-semibold">
          Jawad Khan: Sample Voice Text...
        </p>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = Number(e.target.value);
            }
          }}
          className="w-full mt-2 accent-orange-500"
        />
        <div className="text-gray-400 text-xs flex justify-between mt-1">
          <span>{new Date(currentTime * 1000).toISOString().substring(14, 19)}</span>
          <span>{new Date(duration * 1000).toISOString().substring(14, 19)}</span>
        </div>
      </div>

      {/* Feedback & Download */}
      <div className="flex items-center space-x-3 text-gray-400">
        <p className="text-xs">How did this sound?</p>
        <button onClick={() => toast.error("Not allowed, please contact to admin.")} className="hover:text-white">
          <ThumbsUp size={16} />
        </button>
        <button onClick={() => toast.error("Not allowed, please contact to admin.")} className="hover:text-white">
          <ThumbsDown size={16} />
        </button>
        <button onClick={() => toast.error("Not allowed, please contact to admin.")} className="hover:text-white">
          <Download size={16} />
        </button>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/sample-audio.mp3"
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateTime}
      />
    </div>
  );
}
