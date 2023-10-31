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
		acceleration: new Vector2(0, 0),
		mass: 1,
		color: "red",
	},
	{
		position: new Vector2(0.5, 0.5),
		velocity: new Vector2(-1, 0),
		acceleration: new Vector2(0, 0),
		mass: 1,
		color: "blue",
	},
];

const updater = new BodyUpdater();
const drawer = new CanvasDrawer(canvas);

const update = () => {
	bodies = updater.update(bodies, 0.001);
	console.log(bodies);
	drawer.clear();
	drawer.draw(bodies);

	if (bodies[0].position.subtract(bodies[1].position).magnitude() < 4) {
		requestAnimationFrame(update);
	}
};

requestAnimationFrame(update);
