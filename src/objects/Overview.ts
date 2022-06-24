import Phaser from "phaser";

export default class Overview {
	daytime = ["night", "noon", "sunrise", "sunset"];

	background!: Phaser.GameObjects.TileSprite;
	land!: Phaser.GameObjects.TileSprite;
	overViewFirst!: Phaser.GameObjects.TileSprite;
	overViewSecond!: Phaser.GameObjects.TileSprite;
	overViewThird!: Phaser.GameObjects.TileSprite;
	overViewFourth!: Phaser.GameObjects.TileSprite;
	dayTimeRandom: string =
		this.daytime[Math.floor(Math.random() * this.daytime.length)];
	constructor(scene: Phaser.Scene) {
		const overlay = scene.add
			.image(950, 450, `${this.dayTimeRandom}-overlay`)
			.setScale(1.5);
		this.background = scene.add
			.tileSprite(0, 0, 1900, 640, `${this.dayTimeRandom}-bg`)
			.setOrigin(0);
		this.land = scene.add
			.tileSprite(0, 650, 1900, 450, `${this.dayTimeRandom}-land`)
			.setOrigin(0, 0)
			.setSize(1900, 62);
		this.land.tilePositionY = -62;
		if (this.dayTimeRandom === "noon") {
			this.overViewFirst = scene.add.tileSprite(
				0,
				230,
				1900,
				620,
				`${this.dayTimeRandom}-first`
			);
			this.overViewSecond = scene.add.tileSprite(
				0,
				220,
				1900,
				540,
				`${this.dayTimeRandom}-second`
			);
		} else {
			this.overViewFirst = scene.add.tileSprite(
				0,
				200,
				1900,
				620,
				`${this.dayTimeRandom}-first`
			);
			this.overViewSecond = scene.add.tileSprite(
				0,
				190,
				1900,
				540,
				`${this.dayTimeRandom}-second`
			);
		}
		this.overViewFirst.setOrigin(0).setDepth(4);
		this.overViewSecond.setOrigin(0).setDepth(3);
		this.overViewThird = scene.add
			.tileSprite(0, 190, 1900, 540, `${this.dayTimeRandom}-third`)
			.setOrigin(0)
			.setDepth(2);
		this.overViewFourth = scene.add
			.tileSprite(0, 190, 1900, 540, `${this.dayTimeRandom}-fourth`)
			.setOrigin(0)
			.setDepth(1);
	}
	create(): void {}
	update(): void {
		// Overview
		this.background.tilePositionX += 0.1;
		this.land.tilePositionX += 1;
		this.overViewFirst.tilePositionX += 0.9;
		this.overViewSecond.tilePositionX += 0.7;
		this.overViewThird.tilePositionX += 0.5;
		this.overViewFourth.tilePositionX += 0.2;
	}
}
