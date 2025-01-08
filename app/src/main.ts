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

const options = { dt: 0.001, play: true };

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
	if (options.play) {
		bodies = updater.update(bodies, options.dt);
		// console.log(bodies);
	}

	drawer.clear();
	drawer.draw(bodies);

	if (isFinished(bodies)) options.play = false;
};

const getSliderValue = (id: string, defaultValue: number = 0) => {
	const slider = <HTMLInputElement | null>document.getElementById(id);
	return slider ? parseInt(slider.value) : defaultValue;
};

const getCheckboxValue = (id: string, defaultValue: boolean = false) => {
	const checkbox = <HTMLInputElement | null>document.getElementById(id);
	return checkbox ? checkbox.checked : defaultValue;
};

const init = () => {
  const bodyCount = getSliderValue("config-count", 3);
  const velosityScaler = getSliderValue("config-velocity", 10) / 100;
  const massScaler = getSliderValue("config-mass", 20);
  const randomizeMass = getCheckboxValue("config-randomize-mass", false);
  const regularObject = getCheckboxValue("config-regular", false);
  const timestep = getSliderValue("config-timestep", 10);
  console.log(bodyCount, velosityScaler, massScaler, regularObject, timestep);

  if (regularObject) {
    // 3=10, 6=6, 12=2
    bodies = generateRegularStructure(bodyCount, massScaler / 20);
  } else {
    bodies = generateRandomPopulation(bodyCount, 10 * velosityScaler, massScaler, randomizeMass);
  }

  console.log(bodies);

  options.dt = 0.0001 * timestep;
};

const startstop = () => {
  options.play = !options.play;
};

const updateHeading = () => {
  const bodyCount = getSliderValue("config-count", 3);
  const bodyCountElement = document.getElementById("body-count");
  if (bodyCountElement) bodyCountElement.innerHTML = bodyCount.toString();
};

init();
setInterval(() => update(), 1000 / framerate);

document.getElementById("generate")?.addEventListener("click", init);
document.getElementById("startstop")?.addEventListener("click", startstop);
document.getElementById("config-count")?.addEventListener("input", updateHeading);

