import { CanvasDrawer } from "./canvas/canvas.ts";
import { HeavyBody } from "./models/body.ts";
import { Vector2 } from "./models/vector2.ts";
import "./style.css";

const canvas = <HTMLCanvasElement | null>document.getElementById("canvas");
if (!canvas) throw new Error("Canvas not found");

let bodies: HeavyBody[] = [
	{
		position: new Vector2(1, 1),
		velocity: new Vector2(0.01, 0.01),
		mass: 100,
		color: "red",
	},
	{
		position: new Vector2(-0.5, -0.5),
		velocity: new Vector2(0.01, 0.01),
		mass: 100,
		color: "blue",
	},
];

const drawer = new CanvasDrawer(canvas);

const update = () => {
	console.log(bodies);
	drawer.clear();
	drawer.draw(bodies);
	requestAnimationFrame(update);
};

requestAnimationFrame(update);
