import { signal } from "./SignalEmitter.js";
import { keyHandler } from "./KeyEventHandler.js";

export const requestAnimationFrameLoop = {
    tick: function(lastUpdate=performance.now()) {
        const key = keyHandler;
        if (key && key.pressed("K_CTRL") && key.pressed("KEY_Q")) {
            return console.warn("TERMINATE:", "User terminated \"requestAnimationFrame loop\" (CTRL+Q).");
        }
        const now = performance.now();
        const dt = now - lastUpdate;
        signal.emit('tick', dt)
        requestAnimationFrame(this.tick.bind(this, now))
    }
}