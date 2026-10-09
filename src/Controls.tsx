import React from "react";

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export default function Controls({
  isPlaying,
  onTogglePlay,
  speed,
  onSpeedChange,
}: ControlsProps) {
  const speedPresets = [0.5, 1, 2, 5, 10];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-2xl px-6 py-3 shadow-2xl z-20">
      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white shadow-lg shadow-indigo-600/30"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="4" height="12" rx="1" />
            <rect x="9" y="2" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2l10 6-10 6V2z" />
          </svg>
        )}
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-700" />

      {/* Speed Control */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 whitespace-nowrap">Speed:</span>
        <div className="flex gap-1">
          {speedPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => onSpeedChange(preset)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                speed === preset
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {preset}x
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-700" />

      {/* Speed Slider */}
      <div className="flex items-center gap-2">
        <input
          type="range"
          min="0.1"
          max="20"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-24 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
        />
        <span className="text-xs text-gray-400 w-10 text-right">
          {speed.toFixed(1)}x
        </span>
      </div>
    </div>
  );
}
