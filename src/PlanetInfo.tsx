import React from "react";
import { Planet, planets } from "./planetData";

interface PlanetInfoProps {
  planet: Planet | null;
  onClose: () => void;
}

export default function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  if (!planet) return null;

  const planetIndex = planets.findIndex((p) => p.name === planet.name);

  return (
    <div className="absolute top-4 right-4 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden z-20 animate-slideIn">
      {/* Header */}
      <div className="relative p-5 pb-3">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
        >
          ✕
        </button>
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full shadow-lg flex-shrink-0"
            style={{
              background: planet.texture,
              boxShadow: `0 0 20px ${planet.color}44`,
            }}
          />
          <div>
            <h2 className="text-xl font-bold text-white">{planet.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Planet #{planetIndex + 1} from the Sun
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 pb-3 grid grid-cols-2 gap-3">
        <StatCard
          icon="📏"
          label="Radius"
          value={planet.realRadius}
        />
        <StatCard
          icon="🌍"
          label="Distance"
          value={planet.realDistance}
        />
        <StatCard
          icon="🔄"
          label="Orbital Period"
          value={formatOrbitalPeriod(planet.orbitalPeriod)}
        />
        <StatCard
          icon="⚡"
          label="Relative Speed"
          value={`${planet.speed.toFixed(2)}x`}
        />
      </div>

      {/* Description */}
      <div className="px-5 pb-5">
        <p className="text-sm text-gray-300 leading-relaxed">
          {planet.description}
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-sm">{icon}</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function formatOrbitalPeriod(days: number): string {
  if (days < 365) return `${days} days`;
  const years = (days / 365.25).toFixed(1);
  return `${years} years`;
}
