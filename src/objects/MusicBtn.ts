import Phaser from "phaser";

export default class MusicBtn {
	soundSprite: Phaser.GameObjects.Sprite;
	constructor(scene: Phaser.Scene) {
		const soundMain = scene.sound.add("mainTheme");
        soundMain.play()
		this.soundSprite = scene.add
			.sprite(1740, 150, "sound")
			.setDepth(6)
			.setScale(0.6)
			.setInteractive()
			.addListener("pointerdown", () => {
				if (soundMain.isPlaying) {
					soundMain.pause();
					this.soundSprite.setFrame(1);
				} else {
					soundMain.resume();
					this.soundSprite.setFrame(0);
				}
			});
		scene.add.image(1790, 150, "howtoplay").setDepth(6).setScale(0.6);
	}
}
