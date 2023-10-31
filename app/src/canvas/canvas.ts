import { HeavyBody } from "../models/body";
import { Vector2 } from "../models/vector2";

export class CanvasDrawer {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas context not found");
		this.ctx = ctx;
	}

	private getDimensions(): { width: number; height: number } {
		return this.canvas.getBoundingClientRect();
	}

	private coordsToPixel(position: Vector2): Vector2 {
		const { width, height } = this.getDimensions();
		return new Vector2(((position.x + 1) / 2) * width, ((-position.y + 1) / 2) * height);
	}

	public clear() {
		const { width, height } = this.getDimensions();
		this.ctx.clearRect(0, 0, width, height);
	}

	public draw(bodies: HeavyBody[]) {
		for (const body of bodies) {
			const pos = this.coordsToPixel(body.position);
			const radius = body.size ?? 8;

			this.ctx.fillStyle = body.color || "rgb(200, 0, 0)";
			this.ctx.beginPath();
			this.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
			this.ctx.fill();
		}
	}
}
