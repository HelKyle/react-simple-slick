export const isVertial = (radian: number) => {
  let angle: number = radian * 180 / Math.PI;
  angle = angle % 360;

  return (angle > 45 && angle < 135) 
    || (angle < -45 && angle > -135);
}

export class Vector {
  x: number;
  y: number;

  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  static add (vector1: Vector, vector2: Vector) {
    return new Vector (
      vector1.x + vector2.x,
      vector1.y + vector2.y
    )
  }
  static sub (vector1: Vector, vector2: Vector) {
    return new Vector (
      vector1.x - vector2.x,
      vector1.y - vector2.y
    )
  }
  static isVertial(vector: Vector) {
    return isVertial(vector.heading());
  }
  heading() {
    return -Math.atan2(this.y, this.x)
  }
  distance() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}
