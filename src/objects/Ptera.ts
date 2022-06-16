import Phaser from "phaser";

export default class Ptera {
	ptera: Phaser.Physics.Arcade.Sprite;

	constructor(scene: Phaser.Scene) {
		this.ptera = scene.physics.add.sprite(1900, 0, "ptera");
        this.ptera.setY(Phaser.Math.Between(200, 600));
        this.ptera.body.allowGravity = false;
	}
	create(): void {
		this.ptera.setScale(0.5).setDepth(5).setCollideWorldBounds(true);
        this.ptera.anims.create({
            key: "swing",
            frames: this.ptera.anims.generateFrameNumbers("ptera", {}),
            repeat: -1,
            frameRate: 10,
        })
        this.ptera.anims.play("swing", true);
	}
    update(): void {
        this.ptera.x -= 6;
        if(this.ptera.x <= this.ptera.width) {
            this.ptera.destroy();
        }
    }
    getPtera(): Phaser.Physics.Arcade.Sprite {
        return this.ptera;
    }
}
