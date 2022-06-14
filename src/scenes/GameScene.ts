import Phaser from "phaser";
import Dino from "../objects/Dino";

export default class GameScene extends Phaser.Scene {
	daytime = ["night", "noon", "sunrise", "sunset"];
	background!: Phaser.GameObjects.TileSprite;
	land!: Phaser.GameObjects.TileSprite;
	overViewFirst!: Phaser.GameObjects.TileSprite;
	overViewSecond!: Phaser.GameObjects.TileSprite;
	overViewThird!: Phaser.GameObjects.TileSprite;
	overViewFourth!: Phaser.GameObjects.TileSprite;
	dino!: Dino;

	constructor() {
		super({
			key: "GameScene",
		});
	}
	init(): void {}
	preload(): void {
		this.load.pack("gamePack", "/public/assets/pack.json", "gamePack");
	}
	create(): void {
		const dayTimeRandom =
			this.daytime[Math.floor(Math.random() * this.daytime.length)];
		const overlay = this.add
			.image(950, 450, `${dayTimeRandom}-overlay`)
			.setScale(1.5);
		this.background = this.add
			.tileSprite(0, 0, 1900, 640, `${dayTimeRandom}-bg`)
			.setOrigin(0);
		this.land = this.add
			.tileSprite(0, 250, 1900, 640, `${dayTimeRandom}-land`)
			.setOrigin(0);
		if (dayTimeRandom === "noon") {
			this.overViewFirst = this.add.tileSprite(
				0,
				230,
				1900,
				620,
				`${dayTimeRandom}-first`
			);
			this.overViewSecond = this.add.tileSprite(
				0,
				220,
				1900,
				540,
				`${dayTimeRandom}-second`
			);
		} else {
			this.overViewFirst = this.add.tileSprite(
				0,
				200,
				1900,
				620,
				`${dayTimeRandom}-first`
			);
			this.overViewSecond = this.add.tileSprite(
				0,
				190,
				1900,
				540,
				`${dayTimeRandom}-second`
			);
		}
		this.overViewFirst.setOrigin(0).setDepth(4);
		this.overViewSecond.setOrigin(0).setDepth(3);
		this.overViewThird = this.add
			.tileSprite(0, 190, 1900, 540, `${dayTimeRandom}-third`)
			.setOrigin(0)
			.setDepth(2);
		this.overViewFourth = this.add
			.tileSprite(0, 190, 1900, 540, `${dayTimeRandom}-fourth`)
			.setOrigin(0)
			.setDepth(1);

		// Dino
		this.dino = new Dino({
			scene: this,
		});
		this.dino.create();
		this.physics.collide
	}
	update(): void {
		this.background.tilePositionX += 0.1;
		this.land.tilePositionX += 1;
		this.overViewFirst.tilePositionX += 0.9;
		this.overViewSecond.tilePositionX += 0.7;
		this.overViewThird.tilePositionX += 0.5;
		this.overViewFourth.tilePositionX += 0.2;
		this.dino.update();
	}
}
