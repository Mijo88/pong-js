import { requestAnimationFrameLoop } from "../lib/RequestAnimationFrameLoop.js";
import { signal } from "../lib/SignalEmitter.js";
import { Canvas } from "../lib/Canvas.js";
import { Rect2D } from "../lib/Utils.js";
import { config } from "../config.js";
import { Ball } from "./Ball.js";
import { Collider } from "./Collider.js";
import Player from "./Player.js";

export class GameController {
  constructor() {
    this.createPlayers = this.createPlayers.bind(this);
    this.createBall = this.createBall.bind(this);
    this.player = this.player.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.onSignalScore = this.onSignalScore.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this._state = { status: 1 };
    this._canvas = new Canvas(1024, 512, {
      append: document.body,
      styles: config.canvasStyles,
    });
    this._players = this.createPlayers(this._canvas);
    this._ball = this.createBall(this._canvas);
    this._boundaries = this.createBoundaries(this._canvas);

    this._line = new Rect2D(
      this._canvas.width / 2,
      20,
      2,
      this._canvas.height - 40
    );

    signal.listen("tick", this.update);
    signal.listen("score", this.onSignalScore);
    signal.listen("keydown", this.onKeyDown);
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
      _rect: new Rect2D(0, 0, ctx.width, config.y_margin),
    }
    const bottom = {
      name: "boundary",
      _rect: new Rect2D(0, ctx.height - config.y_margin, ctx.width, config.y_margin),
    }
    const left = {
      name: "score",
      side: "left",
      _rect: new Rect2D(0, 0, config.x_margin - 20, ctx.height),
    }
    const right = {
      name: "score",
      side: "right",
      _rect: new Rect2D(ctx.width - (config.x_margin - 20), 0, config.x_margin - 20, ctx.height),
    }
    top._collider = new Collider(top);
    bottom._collider = new Collider(bottom);
    left._collider = new Collider(left);
    right._collider = new Collider(right);
    return [top, bottom, left, right];
  }

  createPlayers(ctx) {
    const arr = []
    const { x_margin, y_margin, paddle } = config;

    let rect = new Rect2D(
      x_margin,
      (ctx.height / 2) - (paddle.height / 2),
      paddle.width,
      paddle.height
    );
    arr.push(new Player(1, rect, this._canvas));

    rect.x = ctx.width - x_margin - paddle.width;
    arr.push(new Player(2, rect, this._canvas));
    return arr;
  }

  player(int) {
    return this._players[int - 1];
  }

  get ball() {
    return this._ball;
  }

  getState(prop) {
    return this._state[prop];
  }

  setState(newState) {
    Object.keys(newState).forEach(key => {
      const value = newState[key];
      this._state[key] = value;
    })
  }

  onSignalScore(value) {
    this.setState({ status: 0 })
    this.player(value)._score += 1;
    this.draw(0);
    this._ball.reset();
  }

  onKeyDown(key) {
    if (key === "K_SPACE" && this.getState("status") === 0) {
      this.setState({ status: 1 })
    }
  }

  draw(dt) {
    const ctx = this._canvas;
    ctx.clearAll();
    // draw middle line
    ctx.begin();
    ctx.fillStyle(config.componentColor);
    ctx.fillRect(this._line);

    this.player(1).draw();
    this.player(2).draw();

    this._ball.draw();
  }

  update(dt) {
    const { status } = this._state;
    if (status === 0) return;
    else if (status === 1) {
      // update players
      this.player(1).update(dt);
      this.player(2).update(dt);
      // update the ball
      this.ball.update(dt);
      // draw
      this.draw(dt);
    }
  }
}