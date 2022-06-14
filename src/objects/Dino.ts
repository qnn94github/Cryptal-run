export default class Dino extends Phaser.GameObjects.Sprite {

	jumpKey!: Phaser.Input.Keyboard.Key;
	sitKey!: Phaser.Input.Keyboard.Key;
	leftKey!: Phaser.Input.Keyboard.Key;
	rightKey!: Phaser.Input.Keyboard.Key;

	constructor(params: any) {
		super(
			params.scene,
			(params.x = 150),
			(params.y = 650),
			(params.key = "dino")
		);
		// Phisical
		const a = this.scene.physics.add.existing(this);
		a.setBounce(0.2);
		a.setCollideWorldBounds(true);
		// Input
		this.jumpKey = this.scene.input.keyboard.addKey("w");
		this.sitKey = this.scene.input.keyboard.addKey("s");
		this.leftKey = this.scene.input.keyboard.addKey("a");
		this.rightKey = this.scene.input.keyboard.addKey("d");
	}
	create(): void {
		this.setScale(0.5);
		this.setDepth(5);
		this.scene.add.existing(this);
		this.anims.create({
			key: "walk",
			frames: this.anims.generateFrameNumbers("dino", {}),
			repeat: -1,
			frameRate: 15,
		});
		this.anims.play("walk", true);
	}

	update(): void {
		this.x -= 1;
		this.anims.create({
			key: "walk",
			frames: this.anims.generateFrameNumbers("dino", {}),
			repeat: -1,
			frameRate: 15,
		});
		this.anims.create({
			key: "sit",
			frames: this.anims.generateFrameNumbers("dino-ducking", {}),
			repeat: -1,
			frameRate: 15,
		});
		if (this.leftKey.isDown) {
			this.x -= 4;
		} else if (this.rightKey.isDown) {
			console.log(123)
			this.x += 4;
		} else if (this.jumpKey.isDown) {
		} else if (this.sitKey.isDown) {
			if (this.texture.key === "dino") {
				this.y = 670;
				this.setTexture("dino-ducking");
				this.anims.remove("walk");
				this.anims.play("sit", true);
			}
		} else if (this.sitKey.isUp) {
			if (this.texture.key === "dino-ducking") {
				this.y = 650;
				this.setTexture("dino");
				this.anims.remove("sit");
				this.anims.play("walk", true);
			}
		}
	}
}
