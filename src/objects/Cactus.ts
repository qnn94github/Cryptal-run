import Phaser from "phaser";

export default class Cactus {
	cactusType = ["cactus-small", "cactus-big", "cactus-group"];
	cactusTypeRandom =
		this.cactusType[Math.floor(Math.random() * this.cactusType.length)];
	cactus!: Phaser.Physics.Arcade.Image;

	constructor(scene: Phaser.Scene) {
		this.cactus = scene.physics.add.image(1900, 600, this.cactusTypeRandom);
	}

	create(): void {
		this.cactus.setDepth(5).setCollideWorldBounds(true);
	}
	update(): void {
		this.cactus.x -= 2;
		if (this.cactus.x <= this.cactus.width) {
			this.cactus.destroy();
		}
	}
	getCactus(): Phaser.Physics.Arcade.Image {
		return this.cactus;
	}
}
