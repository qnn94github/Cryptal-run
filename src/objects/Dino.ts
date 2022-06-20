export default class Dino {
	dino!: Phaser.Physics.Arcade.Sprite;

	jumpKey!: Phaser.Input.Keyboard.Key;
	sitKey!: Phaser.Input.Keyboard.Key;
	leftKey!: Phaser.Input.Keyboard.Key;
	rightKey!: Phaser.Input.Keyboard.Key;
	isCollider!: boolean;
	jumpSound !: Phaser.Sound.BaseSound;
	
	constructor(scene: Phaser.Scene) {
		this.jumpSound = scene.sound.add('jump');
		// Phisical
		this.dino = scene.physics.add.sprite(100, 100, "dino");
		// Input
		this.jumpKey = scene.input.keyboard.addKey("w");
		this.sitKey = scene.input.keyboard.addKey("s");
		this.leftKey = scene.input.keyboard.addKey("a");
		this.rightKey = scene.input.keyboard.addKey("d");
		this.isCollider = false;
	}
	create(): void {
		this.dino
			.setScale(0.5)
			.setDepth(5)
			.setBounce(0.2)
			.setCollideWorldBounds(true);

		this.dino.anims.create({
			key: "walk",
			frames: this.dino.anims.generateFrameNumbers("dino", {}),
			repeat: -1,
			frameRate: 15,
		});
		this.dino.anims.create({
			key: "sit",
			frames: this.dino.anims.generateFrameNumbers("dino-ducking", {}),
			repeat: -1,
			frameRate: 15,
		});
		this.dino.anims.play("walk", true);
	}
	update(): void {
		if (!this.isCollider) {
			this.dino.x -= 1;
		}
		if (this.leftKey.isDown) {
			this.dino.x -= 4;
		} else if (this.rightKey.isDown) {
			this.dino.x += 4;
		} else if (this.jumpKey.isDown) {
			if(this.dino.y > 600) {
				this.dino.setVelocityY(-350);
				this.jumpSound.play();
			}
			if (this.dino.texture.key === "dino") {
				this.dino.setTexture("dino-ducking");
				this.dino.anims.play("sit", true);
				this.dino.setSize(150, 92);
				this.dino.y -= 10;
			}
		} else if (this.sitKey.isDown) {
			if (this.dino.texture.key === "dino") {
				this.dino.setTexture("dino-ducking");
				this.dino.anims.play("sit", true);
				this.dino.setSize(150, 92);
				this.dino.y -= 10;
			}
		} else if (this.sitKey.isUp) {
			if (this.dino.texture.key === "dino-ducking") {
				this.dino.setTexture("dino");
				this.dino.anims.play("walk", true);
				this.dino.setSize(150, 180);
				this.dino.y -= 20;
			}
		}
	}
	getDino(): Phaser.Physics.Arcade.Sprite {
		return this.dino;
	}
}
