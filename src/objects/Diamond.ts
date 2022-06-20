import { create } from "domain";
import Phaser from "phaser";

export default class Diamond {
	diamond: Phaser.Physics.Arcade.Sprite;

	constructor(scene: Phaser.Scene) {
		this.diamond = scene.physics.add.sprite(1900, 0, "diamond");
		this.diamond.setY(Phaser.Math.Between(400, 600));
		this.diamond.body.allowGravity = false;
	}
	create(): void {
		this.diamond.setScale(0.5).setDepth(5).setCollideWorldBounds(true);

		this.diamond.anims.create({
			key: "swing",
			frames: this.diamond.anims.generateFrameNumbers("diamond", {}),
			frameRate: 10,
			repeat: -1,
		});
		this.diamond.anims.play("swing", true);
	}
	update(): void {
		this.diamond.x -= 5;
        if(this.diamond.x <= this.diamond.width) {
            this.diamond.destroy();
        }
	}
	getDiamond(): Phaser.Physics.Arcade.Sprite {
		return this.diamond;
	}
}
