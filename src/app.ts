import "phaser";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
	title: "Cryptal Run",
	width: 1900,
	height: 900,
	scene: [GameScene],
	parent: "game",
	input: {
		keyboard: true,
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: false,
		},
	},
	backgroundColor: "#18216D",
};
export class StarfallGame extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);
	}
}
window.onload = () => {
	let game = new StarfallGame(config);
};
