import { HeavyBody } from "../models/body";
import { Vector2 } from "../models/vector2";

const colors = [
  "#b91c1c",
  "#4d7c0f",
  "#0369a1",
  "#6d28d9",
  "#a16207",
  "#86198f",
  "red",
  "blue",
  "green",
  "yellow",
  "pink",
  "orange",
  "purple",
  "gray",
  "cyan",
  "magenta",
  "maroon",
];

const generateRandomVector = () => {
	return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
};

const generateRandomColor = () => {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const colorForIndex = (index: number) => {
	return index < colors.length ? colors[index] : generateRandomColor();
};

export const generateRandomPopulation = (count = 3, velosityScaler = 0.1, massScaler = 20, randomizeMass = true) => {
	const bodies: HeavyBody[] = [];
	for (let i = 0; i < count; i++) {
		const massRadnom = randomizeMass ? Math.max(Math.random(), 0.1) : 0.5;
		bodies.push({
			position: generateRandomVector().scale(0.8),
			velocity: generateRandomVector().scale(velosityScaler),
			mass: massRadnom * massScaler,
			size: 16 * Math.sqrt(4 * massRadnom),
			color: colorForIndex(i),
		});
	}
	return bodies;
};

export const generateRegularStructure = (edges = 3, mass = 1) => {
	return [...Array(edges).keys()].map((i) => {
		const angle = (i / edges) * 2 * Math.PI;
		return {
			position: new Vector2(Math.sin(angle), Math.cos(angle)).scale(0.5),
			velocity: new Vector2(Math.cos(angle), -Math.sin(angle)),
			color: colorForIndex(i),
			mass: mass,
			size: 18,
		};
	});
};
