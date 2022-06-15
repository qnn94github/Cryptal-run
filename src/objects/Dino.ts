export default class Dino extends Phaser.GameObjects.Sprite {
	dino!: Phaser.Physics.Arcade.Sprite;
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
		this.dino = this.scene.physics.add.sprite(params.x, params.y, params.key);
		// Input
		this.jumpKey = this.scene.input.keyboard.addKey("w");
		this.sitKey = this.scene.input.keyboard.addKey("s");
		this.leftKey = this.scene.input.keyboard.addKey("a");
		this.rightKey = this.scene.input.keyboard.addKey("d");
	}
	create(): void {
		this.dino
			.setScale(0.5)
			.setDepth(5)
			.setBounce(0.2)
			.setCollideWorldBounds(true);
		this.dino.body.setSize(150, 180);

		this.dino.anims.create({
			key: "walk",
			frames: this.anims.generateFrameNumbers("dino", {}),
			repeat: -1,
			frameRate: 15,
		});
		this.dino.anims.play("walk", true);
	}


	update(): void {
		this.dino.x -= 1;
		this.dino.anims.create({
			key: "walk",
			frames: this.anims.generateFrameNumbers("dino", {}),
			repeat: -1,
			frameRate: 15,
		});
		this.dino.anims.create({
			key: "sit",
			frames: this.anims.generateFrameNumbers("dino-ducking", {}),
			repeat: -1,
			frameRate: 15,
		});
		if (this.leftKey.isDown) {
			this.dino.x -= 4;
		} else if (this.rightKey.isDown) {
			this.dino.x += 4;
		} else if (this.jumpKey.isDown) {
			this.dino.setVelocityY(-300);
			if (this.dino.texture.key === "dino") {
				// this.dino.y = 670;
				this.dino.setTexture("dino-ducking");
				this.dino.anims.remove("walk");
				this.dino.anims.play("sit", true);
			}
		} else if (this.sitKey.isDown) {
			if (this.dino.texture.key === "dino") {
				this.dino.setTexture("dino-ducking");
				this.dino.anims.remove("walk");
				this.dino.anims.play("sit", true);
			}
		} else if (this.sitKey.isUp) {
			if (this.dino.texture.key === "dino-ducking") {
				// this.dino.y = 650;
				this.dino.setTexture("dino");
				this.dino.anims.remove("sit");
				this.dino.anims.play("walk", true);
			}
		}
	}
}
