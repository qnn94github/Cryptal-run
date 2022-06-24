import Phaser from "phaser";

export default class MusicBtn {
	soundSprite: Phaser.GameObjects.Sprite;
	isMute: Boolean = false;
	constructor(scene: Phaser.Scene) {
		this.soundSprite = scene.add
			.sprite(1740, 150, "sound")
			.setDepth(6)
			.setScale(0.6)
			.setInteractive();
		scene.add.image(1790, 150, "howtoplay").setDepth(6).setScale(0.6);

		this.soundSprite.addListener("pointerdown", () => {
			this.isMute = !this.isMute
			if (!this.isMute) {
				this.soundSprite.setFrame(0);
			} else {
				this.soundSprite.setFrame(1);
			}
			scene.game.events.emit("setMute", this.isMute);
		});
	}
}
