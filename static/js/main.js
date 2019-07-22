import { GameController } from "./modules/GameController.js";
import { config } from "./config.js";

function main() {
    const gc = new GameController(config);
}
main();