import { CanvasDrawer } from "./canvas/canvas.ts";
import { HeavyBody } from "./models/body.ts";
import { Vector2 } from "./models/vector2.ts";
import "./style.css";
import { generateRandomPopulation, generateRegularStructure } from "./updater/generator.ts";
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

const options = { dt: 0.001 };

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
	bodies = updater.update(bodies, options.dt);
	// console.log(bodies);
	drawer.clear();
	drawer.draw(bodies);

	if (!isFinished(bodies)) setTimeout(() => update(), 1000 / framerate);
};

const getSliderValue = (id: string, defaultValue: number = 0) => {
	const slider = <HTMLInputElement | null>document.getElementById(id);
	return slider ? parseInt(slider.value) : defaultValue;
};

const getCheckboxValue = (id: string, defaultValue: boolean = false) => {
	const checkbox = <HTMLInputElement | null>document.getElementById(id);
	return checkbox ? checkbox.checked : defaultValue;
};

const start = () => {
	const bodyCount = getSliderValue("config-count", 3);
	const velosityScaler = getSliderValue("config-velocity", 10) / 100;
	const massScaler = getSliderValue("config-mass", 20);
	const regularObject = getCheckboxValue("config-regular", false);
	const timestep = getSliderValue("config-timestep", 10);
	console.log(bodyCount, velosityScaler, massScaler, regularObject, timestep);

	const bodyCountElement = document.getElementById("body-count");
	if (bodyCountElement) bodyCountElement.innerHTML = bodyCount.toString();

	if (regularObject) {
		bodies = generateRegularStructure(bodyCount, massScaler / 20);
	} else {
		bodies = generateRandomPopulation(bodyCount, velosityScaler, massScaler);
	}

	console.log(bodies);

	options.dt = 0.0001 * timestep;
};

update();
start();

const reloadButton = <HTMLButtonElement | null>document.getElementById("reload");
reloadButton?.addEventListener("click", start);
