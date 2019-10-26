import { signal } from "./SignalEmitter.js";

export class KeyHandler {
  constructor() {
    this.keyEventHandler = this.keyEventHandler.bind(this);

    this._keysPressed = {};

    document.addEventListener("keydown", this.keyEventHandler)
    document.addEventListener("keyup", this.keyEventHandler)
  }

  pressed(key) {
    return this._keysPressed[key] ? true : false;
  }

  keyEventHandler(event) {
    const repeat = event.repeat;
    if (repeat) return
    
    const key = getKeyString(event.keyCode);
    this._keysPressed[key] = event.type === "keydown" ? true : false;
    signal.emit((event.type === "keydown" ? "keydown" : "keyup"), key, event.target);
  }
}
export const keyHandler = new KeyHandler();

export function getKeyString(keyCode) {
  const prefix = "KEY_"
  const prefix_short = "K_";

  const map = {
    // functional keys
    27: `${prefix_short}ESC`,
    13: `${prefix_short}ENTER`,
    17: `${prefix_short}CTRL`,
    16: `${prefix_short}SHIFT`,
    18: `${prefix_short}ALT`,
    32: `${prefix_short}SPACE`,
    // arrow keys
    38: `${prefix_short}ARROW_UP`,
    40: `${prefix_short}ARROW_DOWN`,
    37: `${prefix_short}ARROW_LEFT`,
    39: `${prefix_short}ARROW_RIGHT`,
    // numeric keys (regular)
    48: `${prefix}0`,
    49: `${prefix}1`,
    50: `${prefix}2`,
    51: `${prefix}3`,
    52: `${prefix}4`,
    53: `${prefix}5`,
    54: `${prefix}6`,
    55: `${prefix}7`,
    56: `${prefix}8`,
    57: `${prefix}9`,
    // numeric keys (numlock)
    96: `${prefix}0`,
    97: `${prefix}1`,
    98: `${prefix}2`,
    99: `${prefix}3`,
    100: `${prefix}4`,
    101: `${prefix}5`,
    102: `${prefix}6`,
    103: `${prefix}7`,
    104: `${prefix}8`,
    105: `${prefix}9`,
    // letters
    65: `${prefix}A`,
    66: `${prefix}B`,
    67: `${prefix}C`,
    68: `${prefix}D`,
    69: `${prefix}E`,
    70: `${prefix}F`,
    71: `${prefix}G`,
    72: `${prefix}H`,
    73: `${prefix}I`,
    74: `${prefix}J`,
    75: `${prefix}K`,
    76: `${prefix}L`,
    77: `${prefix}M`,
    78: `${prefix}N`,
    79: `${prefix}O`,
    80: `${prefix}P`,
    81: `${prefix}Q`,
    82: `${prefix}R`,
    83: `${prefix}S`,
    84: `${prefix}T`,
    85: `${prefix}U`,
    86: `${prefix}V`,
    87: `${prefix}W`,
    88: `${prefix}X`,
    89: `${prefix}Y`,
    90: `${prefix}Z`,
  }
  return map[keyCode] ? map[keyCode] : null;
}