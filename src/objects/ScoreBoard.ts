import Phaser from "phaser";

export default class ScoreBoard {
	board!: Phaser.GameObjects.Image;
	replayBtn!: Phaser.GameObjects.Sprite;
	howtoplayBtn!: Phaser.GameObjects.Sprite;

	constructor(scene: Phaser.Scene) {
		this.board = scene.add.image(950, 400, "scoreboard").setDepth(5);
		this.replayBtn = scene.add
			.sprite(960, 540, "replay-over")
			.setDepth(5)
			.setInteractive()
			.addListener("pointerdown", () => {
				scene.scene.start("GameInit");
			});
		this.howtoplayBtn = scene.add
			.sprite(1030, 540, "howtoplay-over")
			.setDepth(5)
			.setInteractive();
	}
}
