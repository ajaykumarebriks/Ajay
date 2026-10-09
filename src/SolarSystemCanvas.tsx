import React, { useRef, useEffect, useCallback } from "react";
import { planets, Planet } from "./planetData";

interface SolarSystemCanvasProps {
  isPlaying: boolean;
  speed: number;
  onPlanetClick: (planet: Planet) => void;
  selectedPlanet: Planet | null;
}

interface PlanetState {
  angle: number;
  planet: Planet;
}

export default function SolarSystemCanvas({
  isPlaying,
  speed,
  onPlanetClick,
  selectedPlanet,
}: SolarSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planetStatesRef = useRef<PlanetState[]>([]);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const starsRef = useRef<{ x: number; y: number; size: number; brightness: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize planet states
  useEffect(() => {
    planetStatesRef.current = planets.map((planet, i) => ({
      angle: (i * Math.PI * 2) / planets.length + Math.random() * 0.5,
      planet,
    }));
  }, []);

  // Generate stars
  useEffect(() => {
    const stars: { x: number; y: number; size: number; brightness: number }[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
      });
    }
    starsRef.current = stars;
  }, []);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) / 900;

      // Clear canvas
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(Date.now() * 0.001 + star.x * 100) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * twinkle})`;
        ctx.fill();
      });

      // Draw orbit paths
      planets.forEach((planet) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.orbitRadius * scale, 0, Math.PI * 2);
        ctx.strokeStyle =
          selectedPlanet?.name === planet.name
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = selectedPlanet?.name === planet.name ? 1.5 : 0.5;
        ctx.setLineDash(selectedPlanet?.name === planet.name ? [] : [4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Sun glow
      const sunGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        60 * scale
      );
      sunGlow.addColorStop(0, "rgba(255, 200, 50, 0.8)");
      sunGlow.addColorStop(0.3, "rgba(255, 150, 0, 0.4)");
      sunGlow.addColorStop(0.7, "rgba(255, 100, 0, 0.1)");
      sunGlow.addColorStop(1, "rgba(255, 50, 0, 0)");
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60 * scale, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      // Draw Sun
      const sunGradient = ctx.createRadialGradient(
        centerX - 5 * scale,
        centerY - 5 * scale,
        0,
        centerX,
        centerY,
        25 * scale
      );
      sunGradient.addColorStop(0, "#fff7e6");
      sunGradient.addColorStop(0.3, "#ffd700");
      sunGradient.addColorStop(0.7, "#ff8c00");
      sunGradient.addColorStop(1, "#ff4500");
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25 * scale, 0, Math.PI * 2);
      ctx.fillStyle = sunGradient;
      ctx.fill();

      // Sun corona effect
      const coronaTime = Date.now() * 0.002;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + coronaTime;
        const len = (30 + Math.sin(coronaTime + i) * 5) * scale;
        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle) * 25 * scale,
          centerY + Math.sin(angle) * 25 * scale
        );
        ctx.lineTo(
          centerX + Math.cos(angle) * len,
          centerY + Math.sin(angle) * len
        );
        ctx.strokeStyle = `rgba(255, 200, 50, ${0.1 + Math.sin(coronaTime + i) * 0.05})`;
        ctx.lineWidth = 2 * scale;
        ctx.stroke();
      }

      // Draw planets
      planetStatesRef.current.forEach((state) => {
        const { angle, planet } = state;
        const x = centerX + Math.cos(angle) * planet.orbitRadius * scale;
        const y = centerY + Math.sin(angle) * planet.orbitRadius * scale;
        const r = planet.radius * scale;

        // Planet glow for selected
        if (selectedPlanet?.name === planet.name) {
          const glow = ctx.createRadialGradient(x, y, r, x, y, r * 3);
          glow.addColorStop(0, `${planet.color}66`);
          glow.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(x, y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Planet shadow (behind)
        ctx.beginPath();
        ctx.arc(x + 1 * scale, y + 1 * scale, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fill();

        // Planet body
        const planetGradient = ctx.createRadialGradient(
          x - r * 0.3,
          y - r * 0.3,
          0,
          x,
          y,
          r
        );
        planetGradient.addColorStop(0, lightenColor(planet.color, 50));
        planetGradient.addColorStop(0.5, planet.color);
        planetGradient.addColorStop(1, darkenColor(planet.color, 50));
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = planetGradient;
        ctx.fill();

        // Jupiter bands
        if (planet.name === "Jupiter") {
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.clip();
          for (let i = -3; i <= 3; i++) {
            ctx.beginPath();
            ctx.moveTo(x - r, y + i * r * 0.28);
            ctx.lineTo(x + r, y + i * r * 0.28);
            ctx.strokeStyle = i % 2 === 0 ? "rgba(180, 120, 60, 0.3)" : "rgba(200, 160, 100, 0.2)";
            ctx.lineWidth = r * 0.15;
            ctx.stroke();
          }
          // Great Red Spot
          ctx.beginPath();
          ctx.ellipse(x + r * 0.2, y + r * 0.15, r * 0.2, r * 0.12, 0, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(180, 80, 40, 0.5)";
          ctx.fill();
          ctx.restore();
        }

        // Saturn's rings
        if (planet.name === "Saturn") {
          ctx.beginPath();
          ctx.ellipse(x, y, r * 2.2, r * 0.5, -0.3, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(210, 180, 140, 0.6)";
          ctx.lineWidth = 2.5 * scale;
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(x, y, r * 1.7, r * 0.38, -0.3, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(210, 180, 140, 0.35)";
          ctx.lineWidth = 1.5 * scale;
          ctx.stroke();
        }

        // Earth - add a tiny green/blue hint
        if (planet.name === "Earth") {
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.clip();
          // Continents hint
          ctx.beginPath();
          ctx.arc(x - r * 0.2, y - r * 0.1, r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(34, 139, 34, 0.3)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + r * 0.3, y + r * 0.2, r * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(34, 139, 34, 0.25)";
          ctx.fill();
          ctx.restore();
        }

        // Planet name label
        ctx.font = `bold ${Math.max(9, 10 * scale)}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.fillStyle =
          selectedPlanet?.name === planet.name
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 0.7)";
        ctx.textAlign = "center";
        ctx.fillText(planet.name, x, y + r + 14 * scale);
      });
    },
    [selectedPlanet]
  );

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentDpr = 0;

    const animate = (time: number) => {
      const delta = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = time;

      if (isPlaying) {
        planetStatesRef.current.forEach((state) => {
          state.angle += state.planet.speed * speed * delta * 0.5;
        });
      }

      // Handle resize
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      if (
        canvas.width !== Math.round(rect.width * dpr) ||
        canvas.height !== Math.round(rect.height * dpr) ||
        dpr !== currentDpr
      ) {
        currentDpr = dpr;
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }

      draw(ctx, rect.width, rect.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, speed, draw]);

  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const scale = Math.min(rect.width, rect.height) / 900;

    // Check planets in reverse order (outer planets first for easier clicking)
    for (let i = planetStatesRef.current.length - 1; i >= 0; i--) {
      const state = planetStatesRef.current[i];
      const { angle, planet } = state;
      const x = centerX + Math.cos(angle) * planet.orbitRadius * scale;
      const y = centerY + Math.sin(angle) * planet.orbitRadius * scale;
      const r = Math.max(planet.radius * scale, 15); // minimum click area

      const dist = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
      if (dist <= r + 8) {
        onPlanetClick(planet);
        return;
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
}

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `rgb(${r}, ${g}, ${b})`;
}
