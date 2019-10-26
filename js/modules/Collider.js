export const entities = [];

export class Collider {
  constructor(parent, collisionCallback = null) {
    this.update = this.update.bind(this);
    this.onCollision = collisionCallback;

    this._parent = parent;
    entities.push({ ref: this, coords: this.rect, parent: parent });
  }

  get rect() {
    return this._parent._rect;
  }

  get box() {
    return {
      x1: Math.round(this.rect.x),
      x2: Math.round(this.rect.x + this.rect.width),
      y1: Math.round(this.rect.y),
      y2: Math.round(this.rect.y + this.rect.height),
    }
  }

  update() {
    const self = this.box;
    entities.forEach(entity => {
      if (entity.ref === this) {
        return;
      }
      const t = entity.ref.box;
      if ((self.x1 <= t.x1 && self.x2 >= t.x1) || (self.x1 >= t.x1 && self.x1 <= t.x2)) {
        if ((self.y1 <= t.y2 && self.y1 >= t.y1) || (self.y2 >= t.y1 && self.y2 <= t.y2)) {
          this.onCollision && this.onCollision(entity);
        }
      }
    })
  }
}