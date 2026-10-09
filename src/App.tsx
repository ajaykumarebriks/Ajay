import React, { useState } from "react";
import SolarSystemCanvas from "./SolarSystemCanvas";
import PlanetInfo from "./PlanetInfo";
import Controls from "./Controls";
import { Planet } from "./planetData";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet((prev) => (prev?.name === planet.name ? null : planet));
  };

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a1a]">
      {/* Title */}
      <div className="absolute top-4 left-4 z-20">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          🌌 Solar System
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Click on any planet to learn more • Use controls to adjust animation
        </p>
      </div>

      {/* Canvas */}
      <div className="absolute inset-0">
        <SolarSystemCanvas
          isPlaying={isPlaying}
          speed={speed}
          onPlanetClick={handlePlanetClick}
          selectedPlanet={selectedPlanet}
        />
      </div>

      {/* Planet Info Panel */}
      <PlanetInfo planet={selectedPlanet} onClose={handleCloseInfo} />

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      {/* Legend */}
      <div className="absolute bottom-20 left-4 z-10">
        <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/30 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400 mb-2 font-medium">Planets</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {[
              { name: "Mercury", color: "#b5b5b5" },
              { name: "Venus", color: "#e8cda0" },
              { name: "Earth", color: "#4a90d9" },
              { name: "Mars", color: "#c1440e" },
              { name: "Jupiter", color: "#c88b3a" },
              { name: "Saturn", color: "#e8d5a3" },
              { name: "Uranus", color: "#7ec8e3" },
              { name: "Neptune", color: "#3f54ba" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-xs text-gray-300">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
