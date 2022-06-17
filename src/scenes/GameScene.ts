import Phaser from "phaser";
import Overview from "../objects/Overview";
import Header from "../objects/Header";
import Dino from "../objects/Dino";
import Cactus from "../objects/Cactus";
import Ptera from "../objects/Ptera";
import Diamond from "../objects/Diamond";
export default class GameScene extends Phaser.Scene {
	overview!: Overview;
	header!: Header;
	platform!: Phaser.Physics.Arcade.StaticGroup;
	dino!: Dino;
	cactus: Array<Cactus> = [];
	cactusLength!: number;
	pteras: Array<Ptera> = [];
	pterasLength!: number;
	diamonds: Array<Diamond> = [];
	diamondsLength!: number;
	scoreText!: Phaser.GameObjects.Text;
	constructor() {
		super({
			key: "GameScene",
		});
	}
	init(): void {
		this.registry.set("score", 0);
	}
	preload(): void {
		this.load.pack("gamePack", "/public/assets/pack.json", "gamePack");
	}
	create(): void {
		// Overview
		this.overview = new Overview(this);
		this.header = new Header(this);
		this.platform = this.physics.add.staticGroup();
		this.platform.add(this.overview.land).refresh();
		this.scoreText = this.add
			.text(1700, 100, this.registry.get("score"))
			.setDepth(6)
			.setFontSize(30)
			.setFontStyle("bold");
		// Dino
		this.dino = new Dino(this);
		this.dino.create();
		this.physics.add.collider(this.dino.getDino(), this.platform);

		// Catus
		this.cactus.push(new Cactus(this));
		this.cactusLength = this.cactus.length;
		this.cactus[0].create();
		this.physics.add.collider(this.cactus[0].getCactus(), this.platform);
		this.physics.add.collider(
			this.dino.getDino(),
			this.cactus[0].getCactus(),
			() => {
				this.dino.isCollider = true;
				if (this.dino.isCollider) {
					this.scene.start("GameOver", {
						score: this.registry.values.score,
					});
				}
			}
		);

		// Ptera
		this.pteras.push(new Ptera(this));
		this.pterasLength = this.pteras.length;
		this.pteras[0].create();
		this.physics.add.collider(
			this.pteras[0].getPtera(),
			this.dino.getDino(),
			() => {
				this.dino.isCollider = true;
				if (this.dino.isCollider) {
					this.scene.start("GameOver", {
						score: this.registry.values.score,
					});
				}
			}
		);

		// Diamond
		this.diamonds.push(new Diamond(this));
		this.diamondsLength = this.diamonds.length;
		this.diamonds[0].create();
		this.physics.add.collider(
			this.diamonds[0].getDiamond(),
			this.dino.getDino(),
			() => {
				this.registry.values.score += 20;
				this.diamonds[0].getDiamond().destroy();
				this.dino.isCollider = false;
			}
		);
	}
	update(): void {
		// Overview
		this.overview.update();
		// Dino
		this.dino.update();
		// Catus
		let number = Math.random().toFixed(3);

		for (let i = 0; i < this.cactusLength; i++) {
			this.cactus[i].update();
		}

		if (
			number === "0.247" ||
			this.cactus[this.cactusLength - 1].getCactus().x <
				this.cactus[this.cactusLength - 1].getCactus().width
		) {
			this.registry.values.score += 1;
			this.cactus.push(new Cactus(this));
			this.cactusLength = this.cactus.length;
			this.cactus[this.cactusLength - 1].create();
			this.physics.add.collider(
				this.cactus[this.cactusLength - 1].getCactus(),
				this.platform
			);
			this.physics.add.collider(
				this.dino.getDino(),
				this.cactus[this.cactusLength - 1].getCactus(),
				() => {
					this.dino.isCollider = true;
					if (this.dino.isCollider) {
						this.scene.start("GameOver", {
							score: this.registry.values.score,
						});
					}
				}
			);
		}
		// Ptera
		for (let i = 0; i < this.pterasLength; i++) {
			this.pteras[i].update();
		}
		if (
			number === "0.724" ||
			this.pteras[this.pterasLength - 1].getPtera().x <
				this.pteras[this.pterasLength - 1].getPtera().width
		) {
			this.registry.values.score += 1;
			this.pteras.push(new Ptera(this));
			this.pterasLength = this.pteras.length;
			this.pteras[this.pterasLength - 1].create();
			this.physics.add.collider(
				this.pteras[this.pterasLength - 1].getPtera(),
				this.dino.getDino(),
				() => {
					this.dino.isCollider = true;
					if (this.dino.isCollider) {
						this.scene.start("GameOver", {
							score: this.registry.values.score,
						});
					}
				}
			);
		}
		// Diamond
		for (let i = 0; i < this.diamondsLength; i++) {
			this.diamonds[i].update();
		}
		if (
			number === "0.724" ||
			this.diamonds[this.diamondsLength - 1].getDiamond().x <
				this.diamonds[this.diamondsLength - 1].getDiamond().width
		) {
			this.registry.values.score += 1;
			this.diamonds.push(new Diamond(this));
			this.diamondsLength = this.diamonds.length;
			this.diamonds[this.diamondsLength - 1].create();
			this.physics.add.collider(
				this.diamonds[this.diamondsLength - 1].getDiamond(),
				this.dino.getDino(),
				() => {
					this.registry.values.score += 20;
					this.diamonds[this.diamondsLength - 1].getDiamond().destroy();
					this.dino.isCollider = false;
				}
			);
		}
		this.scoreText.setText(`Score: ${this.registry.values.score}`);
	}
}
