import { Vector2 } from "./vector";

export interface HeavyBody {
	position: Vector2;
	velocity: Vector2;
	mass: number;
    color?: string;
}
