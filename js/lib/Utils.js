export function clamp(value, min_value = null, max_value = null) {
  if (min_value !== null && min_value > value) return min_value;
  if (max_value !== null && max_value < value) return max_value;
  return value;
}

export class Rect2D {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export function normalizeVector2D(x, y) {
  const length = Math.sqrt((x * x) + (y * y))
  const result = {
    x: x / length,
    y: y / length
  }
  return result;
}