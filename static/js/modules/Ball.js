import { clamp, Rect2D, normalizeVector2D } from "../lib/Utils.js";
import { config } from "../config.js";
import { Collider } from "./Collider.js";
import { signal } from "../lib/SignalEmitter.js";

export class Ball
{
    constructor(rect, canvas) {
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
        this.onCollision = this.onCollision.bind(this);
        this.reset = this.reset.bind(this);

        this._name = "ball";
        this._rect = new Rect2D(rect.x, rect.y, rect.width, rect.height);
        this._collider = new Collider(this, this.onCollision);
        this._canvas = canvas;
        this._velocity = { x: 0, y: 0 };
        this._multiplier = 1;

        this.setInitialTrajectory();
    }

    setInitialTrajectory() {
        const vector = normalizeVector2D(
            Math.round(Math.random()) > 0 ? 0.6 : -0.6,
            (Math.round(Math.random() * 200) - 100) / 100
        );
        this.x = vector.x;
        this.y = vector.y;
    }

    onCollision(entity) {
        const name = entity.parent.name;
        const coords = entity.ref.box;
        const rect = this._rect;

        if (name === "player") {
            const id = entity.parent.id
            const deviation = Math.floor(Math.random() * 200 - 100) / 1000;
            this.y += deviation;
            this.x = this.x > 0 ? -Math.abs(this.x) : Math.abs(this.x);
            this._multiplier += (this._multiplier > 3) ? 0 : 0.1;

            this._rect.x = id === 1 ? coords.x2 : coords.x1 - rect.width;
        }
        else if (name === "boundary") {
            const deviation = Math.floor(Math.random() * 200 - 100) / 1000;
            this.y = this.y > 0 ? -Math.abs(this.y) : Math.abs(this.y);
            this.y += deviation;
        }
        else if (name === "score") {
            const playerID = entity.parent.side === "left" ? 2 : 1;
            signal.emit("score", playerID);
        }
    }

    reset() {
        const r = this._rect;
        const ctx = this._canvas;
        
        r.x = (ctx.width / 2) - (config.ball.width / 2);
        r.y = (ctx.height / 2) - (config.ball.height / 2);
        this._multiplier = 1;
        this.setInitialTrajectory();
    }

    get name() {
        return this._name;
    }

    get x() {
        return this._velocity.x;
    }

    set x(value) {
        return this._velocity.x = value;
    }

    get y() {
        return this._velocity.y;
    }

    set y(value) {
        return this._velocity.y = value;
    }

    draw() {
        const ctx = this._canvas;
        ctx.begin();
        ctx.fillStyle(config.componentColor);
        ctx.fillRect(this._rect);
    }

    update(dt) {
        const ctx = this._canvas;
        const r = this._rect;
        const m = this._multiplier;
        const { speed, width, height } = config.ball;
        
        r.y = clamp(
            r.y + (dt * this.y * speed * m),
            config.y_margin,
            ctx.height - config.y_margin - height,
        );
        
        r.x = clamp(
            r.x + (dt * this.x * speed * m),
            0,
            ctx.width - width
        );

        this._collider.update();
    }
}