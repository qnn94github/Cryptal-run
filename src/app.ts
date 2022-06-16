import "phaser";
import GameInit from "./scenes/GameInit";
import GameScene from "./scenes/GameScene";


const config: Phaser.Types.Core.GameConfig = {
	title: "Cryptal Run",
	width: 1900,
	height: 900,
	scene: [GameInit,GameScene],
	parent: "game",
	input: {
		keyboard: true,
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: true,
		},
	},
	backgroundColor: "#18216D",
};
export class CryptalRun extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);
	}
}
window.onload = () => {
	let game = new CryptalRun(config);
};
