export interface Planet {
  name: string;
  color: string;
  radius: number; // display radius in px
  orbitRadius: number; // orbit distance from sun in px
  orbitalPeriod: number; // in Earth days
  realRadius: string; // actual radius
  realDistance: string; // distance from sun
  description: string;
  texture: string; // gradient colors
  speed: number; // relative speed factor
}

export const planets: Planet[] = [
  {
    name: "Mercury",
    color: "#b5b5b5",
    radius: 4,
    orbitRadius: 60,
    orbitalPeriod: 88,
    realRadius: "2,439.7 km",
    realDistance: "57.9 million km",
    description: "The smallest planet and closest to the Sun. Mercury has no atmosphere and experiences extreme temperature variations.",
    texture: "radial-gradient(circle at 30% 30%, #d4d4d4, #8a8a8a, #5c5c5c)",
    speed: 4.15,
  },
  {
    name: "Venus",
    color: "#e8cda0",
    radius: 7,
    orbitRadius: 95,
    orbitalPeriod: 225,
    realRadius: "6,051.8 km",
    realDistance: "108.2 million km",
    description: "Often called Earth's twin due to similar size. Venus has a thick toxic atmosphere and is the hottest planet in our solar system.",
    texture: "radial-gradient(circle at 30% 30%, #f5deb3, #daa520, #b8860b)",
    speed: 1.62,
  },
  {
    name: "Earth",
    color: "#4a90d9",
    radius: 8,
    orbitRadius: 135,
    orbitalPeriod: 365,
    realRadius: "6,371 km",
    realDistance: "149.6 million km",
    description: "Our home planet and the only known planet to harbor life. Earth has liquid water on its surface and a protective atmosphere.",
    texture: "radial-gradient(circle at 30% 30%, #6bb5ff, #2e8b57, #1a5276)",
    speed: 1.0,
  },
  {
    name: "Mars",
    color: "#c1440e",
    radius: 5,
    orbitRadius: 175,
    orbitalPeriod: 687,
    realRadius: "3,389.5 km",
    realDistance: "227.9 million km",
    description: "The Red Planet, named for its reddish appearance due to iron oxide. Mars has the largest volcano and canyon in the solar system.",
    texture: "radial-gradient(circle at 30% 30%, #e8734a, #c1440e, #8b2500)",
    speed: 0.53,
  },
  {
    name: "Jupiter",
    color: "#c88b3a",
    radius: 18,
    orbitRadius: 235,
    orbitalPeriod: 4333,
    realRadius: "69,911 km",
    realDistance: "778.5 million km",
    description: "The largest planet in our solar system. Jupiter is a gas giant with a famous Great Red Spot storm that has raged for centuries.",
    texture: "radial-gradient(circle at 30% 30%, #f0d58c, #c88b3a, #8b6914)",
    speed: 0.084,
  },
  {
    name: "Saturn",
    color: "#e8d5a3",
    radius: 15,
    orbitRadius: 300,
    orbitalPeriod: 10759,
    realRadius: "58,232 km",
    realDistance: "1.43 billion km",
    description: "Known for its spectacular ring system made of ice and rock particles. Saturn is the second-largest planet and a gas giant.",
    texture: "radial-gradient(circle at 30% 30%, #f5e6c8, #e8d5a3, #c4a265)",
    speed: 0.034,
  },
  {
    name: "Uranus",
    color: "#7ec8e3",
    radius: 11,
    orbitRadius: 360,
    orbitalPeriod: 30687,
    realRadius: "25,362 km",
    realDistance: "2.87 billion km",
    description: "An ice giant that rotates on its side. Uranus has a blue-green color due to methane in its atmosphere.",
    texture: "radial-gradient(circle at 30% 30%, #a8e6f0, #7ec8e3, #4a9bb5)",
    speed: 0.012,
  },
  {
    name: "Neptune",
    color: "#3f54ba",
    radius: 10,
    orbitRadius: 410,
    orbitalPeriod: 60190,
    realRadius: "24,622 km",
    realDistance: "4.5 billion km",
    description: "The farthest planet from the Sun. Neptune is an ice giant with the strongest winds in the solar system, reaching 2,100 km/h.",
    texture: "radial-gradient(circle at 30% 30%, #6b7fd4, #3f54ba, #2a3a8c)",
    speed: 0.006,
  },
];

export const sunData = {
  name: "Sun",
  realRadius: "696,340 km",
  description: "The star at the center of our solar system. It contains 99.86% of the mass in the solar system and provides the energy that sustains life on Earth.",
  color: "#ffd700",
  temperature: "5,500°C (surface)",
  type: "G-type main-sequence star",
};
