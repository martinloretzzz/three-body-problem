import { CanvasDrawer } from "./canvas/canvas.ts";
import { HeavyBody } from "./models/body.ts";
import { Vector2 } from "./models/vector2.ts";
import "./style.css";
import { BodyUpdater } from "./updater/updater.ts";

const canvas = <HTMLCanvasElement | null>document.getElementById("canvas");
if (!canvas) throw new Error("Canvas not found");

let bodies: HeavyBody[] = [
	{
		position: new Vector2(-0.5, -0.5),
		velocity: new Vector2(1, 0),
		mass: 2,
		color: "red",
	},
	{
		position: new Vector2(0.5, 0.5),
		velocity: new Vector2(-1, 0),
		mass: 1,
		color: "blue",
	},
	{
		position: new Vector2(0.5, -0.5),
		velocity: new Vector2(-1, 0),
		mass: 1,
		color: "green",
	},
	{
		position: new Vector2(-0.5, 0.5),
		velocity: new Vector2(-1, 0),
		mass: 1,
		color: "pink",
	},
];

const colors = ["red", "blue", "green", "yellow", "pink", "orange", "purple", "gray", "cyan", "magenta", "maroon"];

const generateRandomVector = () => {
	return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
};

const generateRandomColor = () => {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const generateRandomPopulation = (count: number) => {
	const bodies: HeavyBody[] = [];
	for (let i = 0; i < count; i++) {
		bodies.push({
			position: generateRandomVector(),
			velocity: generateRandomVector().scale(0.2),
			mass: Math.max(Math.random() * 2, 0.2),
			color: i < colors.length ? colors[i] : generateRandomColor(),
		});
	}
	return bodies;
};

bodies = generateRandomPopulation(8);

const framerate = 100;

const updater = new BodyUpdater();
const drawer = new CanvasDrawer(canvas);

const isFinished = (bodies: HeavyBody[]) => {
	for (const body of bodies) {
		if (body.position.magnitude() > 100) {
			return true;
		}
	}
	return false;
};

const update = () => {
	bodies = updater.update(bodies, 0.001);
	console.log(bodies);
	drawer.clear();
	drawer.draw(bodies);

	if (!isFinished(bodies)) setTimeout(() => update(), 1000 / framerate);
};

update();
