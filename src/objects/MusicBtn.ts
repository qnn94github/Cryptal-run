import Phaser from "phaser";

export default class MusicBtn {
	soundSprite: Phaser.GameObjects.Sprite;
	soundMain!: Phaser.Sound.BaseSound;
	constructor(scene: Phaser.Scene) {
		this.soundMain = scene.sound.add("mainTheme");
		// this.soundMeat = scene.sound.add("meatSound");
		// this.soundJump = scene.sound.add("jump");
		this.soundMain.pause();
		this.soundSprite = scene.add
			.sprite(1740, 150, "sound")
			.setDepth(6)
			.setScale(0.6)
			.setInteractive()
			.addListener("pointerdown", () => {
				if (this.soundMain.isPaused) {
					this.soundSprite.setFrame(1);
					this.soundMain.play();
					// this.soundMeat.pause();
					// this.soundJump.pause();
				} else {
					this.soundSprite.setFrame(0);
					this.soundMain.pause();
					// this.soundMeat.resume();
					// this.soundJump.resume();
				}
			});
		scene.add.image(1790, 150, "howtoplay").setDepth(6).setScale(0.6);
	}
}
