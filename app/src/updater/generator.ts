import { HeavyBody } from "../models/body";
import { Vector2 } from "../models/vector2";

const colors = ["red", "blue", "green", "yellow", "pink", "orange", "purple", "gray", "cyan", "magenta", "maroon"];

const generateRandomVector = () => {
	return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
};

const generateRandomColor = () => {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const generateRandomPopulation = (count = 3, velosityScaler = 0.1, massScaler = 20) => {
	const bodies: HeavyBody[] = [];
	for (let i = 0; i < count; i++) {
		const massRadnom = Math.max(Math.random(), 0.1);
		bodies.push({
			position: generateRandomVector().scale(0.8),
			velocity: generateRandomVector().scale(velosityScaler),
			mass: massRadnom * massScaler,
			size: 24 * massRadnom,
			color: i < colors.length ? colors[i] : generateRandomColor(),
		});
	}
	return bodies;
};
