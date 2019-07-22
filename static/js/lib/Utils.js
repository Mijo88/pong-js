export function clamp (value, min_value=null, max_value=null)
{
    return (min_value !== null && value < min_value) ? min_value
        : (max_value !== null && value > max_value) ? max_value
        : value;
}

export class Rect2D 
{
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export function normalizeVector2D(x, y) {
    const length = Math.sqrt((x * x) + (y * y))
    const result = { x: x / length, y: y / length }
    return result;
}