import { GameController } from "./modules/GameController.js";
import { config } from "./config.js";

console.log("CONFIG:", config);


function main() {
    const gc = new GameController(config);
}
main();