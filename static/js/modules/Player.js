import { clamp, Rect2D } from "../lib/Utils.js";
import { signal } from "../lib/SignalEmitter.js";
import { config } from "../config.js";
import { keyHandler } from "../lib/KeyEventHandler.js";
import { Collider } from "./Collider.js";


export default class Player
{
    constructor(id, rect, canvas) {
        this.update = this.update.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.draw = this.draw.bind(this);
        this.onCollision = this.onCollision.bind(this);

        this._name = "player";
        this._id = id;
        this._rect = new Rect2D(rect.x, rect.y, rect.width, rect.height);
        this._canvas = canvas;
        this._velocity = 0;
        this._score = 0;
        this._collider = new Collider(this, this.onCollision);
        this._controls = config.keybinds[`player_${id}`];

        signal.listen("keydown", this.onKeyDown);
        signal.listen("keyup", this.onKeyUp);
        this.draw();
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    onCollision() {

    }

    onKeyDown(key) {
        const { MOVE_UP, MOVE_DOWN } = this._controls;
        if (key === MOVE_UP) {
            this._velocity = -1;
        }
        else if (key === MOVE_DOWN) {
            this._velocity = +1;
        }
    }

    onKeyUp(key) {
        const { MOVE_UP, MOVE_DOWN } = this._controls;
        const k = keyHandler;
        if (key === MOVE_UP) {
            this._velocity = k.pressed(MOVE_DOWN) ? +1 : 0;
        }
        else if (key === MOVE_DOWN) {
            this._velocity = k.pressed(MOVE_UP) ? -1 : 0;
        }
    }

    draw() {
        const ctx = this._canvas;
        const x = ctx.width / 2 + (this._id === 1 ? -100 : +100);
        // score
        ctx.begin();
        ctx.fillStyle(config.componentColor);
        ctx.text(
            this._score, 
            {x: x, y: 150}, 
            {size: 64, family: "Pixel", align: "center"}
        );
        // paddle
        ctx.begin();
        ctx.fillStyle(config.componentColor);
        ctx.fillRect(this._rect);
    }

    update(dt) {
        const ctx = this._canvas;
        const r = this._rect;
        const v = this._velocity;
        const { speed, height } = config.paddle;

        r.y = clamp(
            r.y + (v * dt * speed),
            config.y_margin,
            ctx.height - height - config.y_margin,
        )

        //this._collider.update();
        this.draw();
    }
}