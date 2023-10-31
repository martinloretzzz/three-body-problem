import { CanvasDrawer } from "./canvas/canvas.ts";
import { HeavyBody } from "./models/body.ts";
import "./style.css";

const canvas = <HTMLCanvasElement | null>document.getElementById("canvas");
if (!canvas) throw new Error("Canvas not found");

const bodies: HeavyBody[] = [
	{
		position: { x: 1, y: 1 },
		velocity: { x: 0, y: 0 },
		mass: 100,
		color: "red",
	},
	{
		position: { x: -0.5, y: -0.5 },
		velocity: { x: 0, y: 0 },
		mass: 100,
		color: "blue",
	},
];

const drawer = new CanvasDrawer(canvas);

drawer.clear();
drawer.draw(bodies);

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
