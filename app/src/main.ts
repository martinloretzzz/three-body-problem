import { CanvasDrawer } from "./canvas/canvas.ts";
import { HeavyBody } from "./models/body.ts";
import { Vector2 } from "./models/vector2.ts";
import "./style.css";
import { generateRandomPopulation } from "./updater/generator.ts";
import { BodyUpdater } from "./updater/updater.ts";

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

bodies = generateRandomPopulation(8);

const framerate = 100;

const canvas = <HTMLCanvasElement | null>document.getElementById("canvas");
if (!canvas) throw new Error("Canvas not found");

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

const start = () => {
	const bodyCountSlider = <HTMLInputElement | null>document.getElementById("config-count");
	const bodyCount = bodyCountSlider ? parseInt(bodyCountSlider.value) : 3;

	const initialVelositySlider = <HTMLInputElement | null>document.getElementById("config-velocity");
	const velosityScaler = initialVelositySlider ? parseInt(initialVelositySlider.value) / 100 : 0.1;

	const massScalerSlider = <HTMLInputElement | null>document.getElementById("config-mass");
	const massScaler = massScalerSlider ? parseInt(massScalerSlider.value) : 20;

	bodies = generateRandomPopulation(bodyCount, velosityScaler, massScaler);
	update();
};

const reloadButton = <HTMLButtonElement | null>document.getElementById("reload");
reloadButton?.addEventListener("click", start);

start();
