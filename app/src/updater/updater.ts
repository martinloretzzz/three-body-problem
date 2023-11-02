import { HeavyBody } from "../models/body";
import { Vector2 } from "../models/vector2";

const G = 1;

export class BodyUpdater {
	private calculateGravitytionalAcceleration(body: HeavyBody, otherBody: HeavyBody): Vector2 {
		const delta = otherBody.position.subtract(body.position);
		const length = delta.magnitude();
		const direction = delta.normalize();

		const distanceSquare = Math.max(Math.pow(length, 2), 0.01);
		const accel = (G * otherBody.mass) / distanceSquare;

		return direction.scale(accel);
	}

	private calculateAcceleration(body: HeavyBody, bodies: HeavyBody[]): Vector2 {
		let accel = new Vector2(0, 0);
		for (const otherBody of bodies) {
			if (otherBody === body) continue;
			accel = accel.add(this.calculateGravitytionalAcceleration(body, otherBody));
		}
		return accel;
	}

	private updateVelocity(velocity: Vector2, acceleration: Vector2, dt: number): Vector2 {
		return velocity.add(acceleration.scale(dt));
	}

	private updatePosition(position: Vector2, velocity: Vector2, dt: number): Vector2 {
		return position.add(velocity.scale(dt));
	}

	public update(bodies: HeavyBody[], dt: number) {
		return bodies.map((body) => {
			const newBody = { ...body };
			newBody.debugAcceleration = this.calculateAcceleration(body, bodies);
			newBody.velocity = this.updateVelocity(newBody.velocity, newBody.debugAcceleration, dt);
			newBody.position = this.updatePosition(newBody.position, newBody.velocity, dt);
			return newBody;
		});
	}
}
