import { requestAnimationFrameLoop } from "../lib/RequestAnimationFrameLoop.js";
import { signal } from "../lib/SignalEmitter.js";
import { Canvas } from "../lib/Canvas.js";
import { Rect2D } from "../lib/Utils.js";
import { config } from "../config.js";
import { Ball } from "./Ball.js";
import { Collider } from "./Collider.js";
import Player from "./Player.js";

export class GameController
{
    constructor() {
        this.createPlayers = this.createPlayers.bind(this);
        this.createBall = this.createBall.bind(this);
        this.player = this.player.bind(this);
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);

        this._state = { status: 1 };
        this._canvas = new Canvas(1024, 512, {
            append: document.body,
            styles: config.canvasStyles,
        });
        this._players = [];
        this._ball = this.createBall(this._canvas);
        this._boundaries = this.createBoundaries(this._canvas);

        this._line = new Rect2D(
            this._canvas.width / 2,
            20,
            2,
            this._canvas.height - 40
        );

        this.createPlayers(this._canvas);
        signal.listen('tick', this.update);
        requestAnimationFrameLoop.tick();
    }

    createBall(ctx) {
        const rect = new Rect2D(
            (ctx.width / 2) - (config.ball.width / 2),
            (ctx.height / 2) - (config.ball.height / 2),
            config.ball.width,
            config.ball.height,
        )
        return new Ball(rect, this._canvas);
    }

    createBoundaries(ctx) {
        const top = {
            name: "boundary",
            _rect: new Rect2D(0, 0, ctx.width, 10),
        } 
        const bottom = {
            name: "boundary",
            _rect: new Rect2D(0, ctx.height - 10, ctx.width, 10),
        } 
        top._collider = new Collider(top);
        bottom._collider = new Collider(bottom);
        return [top, bottom];
    }

    createPlayers(ctx) {
        const { x_margin, y_margin, paddle } = config;

        let rect = new Rect2D(x_margin, y_margin, paddle.width, paddle.height);
        this._players.push(new Player(1, rect, this._canvas));

        rect.x = ctx.width - x_margin - paddle.width;
        this._players.push(new Player(2, rect, this._canvas));
    }

    player(int) {
        return this._players[int-1];
    }

    get ball()  {
        return this._ball;
    }

    draw(dt) {
        const ctx = this._canvas;
        ctx.clearAll();
        // draw middle line
        ctx.begin();
        ctx.fillStyle(config.componentColor);
        ctx.fillRect(this._line);
        // update players
        this.player(1).update(dt);
        this.player(2).update(dt);
        // draw the ball
        this.ball.update(dt);
    }

    update(dt) {
        const { status } = this._state;
        if (status === 0) {
            return;
        }
        else if (status === 1) {
            this.draw(dt);
        }
    }
}