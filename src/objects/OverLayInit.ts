import Phaser from "phaser";

export default class OverLayInit {
	constructor(scene: Phaser.Scene) {
		
		scene.add.image(300, 300, "pc-guide").setDepth(6);
		scene.add
			.text(700, 200, "Cryptal Run")
			.setDepth(6)
			.setFontSize(50)
			.setFontStyle("bold");
		scene.add
			.image(850, 350, "play")
			.setDepth(6)
			.setInteractive()
			.addListener("pointerdown", () => {
				scene.scene.start("GameScene");
			});
		
	}
}
