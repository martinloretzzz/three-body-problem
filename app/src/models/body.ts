import { Vector2 } from "./vector2";

export interface HeavyBody {
	position: Vector2;
	velocity: Vector2;
	mass: number;
	size?: number;
	color?: string;
	debugAcceleration?: Vector2;
}
