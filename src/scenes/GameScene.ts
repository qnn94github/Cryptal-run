import Phaser from "phaser";
import Overview from "../objects/Overview";
import Header from "../objects/Header";
import Dino from "../objects/Dino";
import Cactus from "../objects/Cactus";
import Ptera from "../objects/Ptera";
import Diamond from "../objects/Diamond";
import MusicBtn from "../objects/MusicBtn";

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
	musicBtn!: MusicBtn;
	themeSound!: Phaser.Sound.BaseSound;
	meatSound!: Phaser.Sound.BaseSound;
	numberArray: Array<number> = [5, 10, 15];
	textArray: Array<string> = [
		`Good + ${this.numberArray[0]}`,
		`Perfect + ${this.numberArray[1]}`,
		`Excellent + ${this.numberArray[2]}`,
	];
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
		this.load.audio("mainTheme", "/public/assets/sound/mainTheme.ogg");
		this.load.audio("meatSound", "/public/assets/sound/meatSound.ogg");
		this.load.audio("jumpSound", "/public/assets/sound/jump.mp3");
	}
	create(data: object): void {
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
				this.dino.isDead = true;
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
				this.dino.isDead = true;
			}
		);
		// MusicBtn
		this.musicBtn = new MusicBtn(this);
		this.themeSound = this.sound.add("mainTheme");
		this.meatSound = this.sound.add("meatSound");
		if (data.sound) {
			this.sound.mute = true;
			this.musicBtn.isMute = true;
			this.musicBtn.soundSprite.setFrame(1);
		} else {
			this.themeSound.play();
			this.musicBtn.isMute = false;
			this.musicBtn.soundSprite.setFrame(0);
		}
		this.game.events.on("setMute", (data: boolean) => {
			if (data) {
				this.sound.mute = true;
			} else {
				this.sound.mute = false;
			}
		});
		// Diamond
		this.diamonds.push(new Diamond(this));
		this.diamondsLength = this.diamonds.length;
		this.diamonds[0].create();
		this.physics.add.collider(
			this.diamonds[0].getDiamond(),
			this.dino.getDino(),
			() => {
				this.diamonds[0].getDiamond().destroy();
				const randomIndex = Math.floor(Math.random() * 3);
				const randomText = this.textArray[randomIndex];
				const diamondText = this.add
					.text(
						this.diamonds[0].getDiamond().x,
						this.diamonds[0].getDiamond().y,
						randomText,
						{
							fontSize: "30px",
							color: "#ffffff",
						}
					)
					.setDepth(5)
					.setFontStyle("bold");
				setTimeout(() => {
					diamondText.destroy();
				}, 1000);
				this.meatSound.play();
				this.registry.values.score += this.numberArray[randomIndex];
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
					this.dino.isDead = true;
				}
			);
		}
		this.cactus.forEach((cactu) => {
			this.cactus[this.cactus.indexOf(cactu)].update();
			if (cactu.getCactus().x < 0) {
				this.cactus.splice(this.cactus.indexOf(cactu), 1);
				this.cactusLength = this.cactus.length;
			}
		});
		// Ptera
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
					this.dino.isDead = true;
				}
			);
		}
		this.pteras.forEach((ptera) => {
			this.pteras[this.pteras.indexOf(ptera)].update();
			if (ptera.getPtera().x < 0) {
				this.pteras.splice(this.pteras.indexOf(ptera), 1);
				this.pterasLength = this.pteras.length;
			}
		});
		// Diamond
		if (
			number === "0.724" ||
			this.diamonds[this.diamondsLength - 1].getDiamond().x <
				this.diamonds[this.diamondsLength - 1].getDiamond().width
		) {
			this.registry.values.score += 1;
			this.diamonds.push(new Diamond(this));
			this.diamondsLength = this.diamonds.length;
			this.diamonds[this.diamondsLength - 1].create();
		}
		this.diamonds.forEach((diamond) => {
			if (this.diamondsLength >= 1) {
				this.physics.add.collider(
					this.diamonds[this.diamonds.indexOf(diamond)].getDiamond(),
					this.dino.getDino(),
					() => {
						this.diamonds[this.diamonds.indexOf(diamond)]
							.getDiamond()
							.destroy();
						const randomIndex = Math.floor(Math.random() * 3);
						const randomText = this.textArray[randomIndex];
						const diamondText = this.add
							.text(
								this.diamonds[this.diamonds.indexOf(diamond)].getDiamond().x,
								this.diamonds[this.diamonds.indexOf(diamond)].getDiamond().y,
								randomText,
								{
									fontSize: "50px",
									color: "#ffffff",
								}
							)
							.setDepth(5)
							.setFontStyle("bold");
						setTimeout(() => {
							diamondText.destroy();
						}, 1000);
						this.meatSound.play();
						this.registry.values.score += this.numberArray[randomIndex];
					}
				);
			}
			this.diamonds[this.diamonds.indexOf(diamond)].update();
			if (diamond.getDiamond().x < 0) {
				this.diamonds.splice(this.diamonds.indexOf(diamond), 1);
				this.diamondsLength = this.diamonds.length;
			}
		});
		this.scoreText.setText(`Score: ${this.registry.values.score}`);
		if (this.dino.isDead) {
			this.cactus = [];
			this.pteras = [];
			this.diamonds = [];
			this.themeSound.pause();
			this.scene.start("GameOver", {
				score: this.registry.values.score,
				sound: this.registry.values.sound,
			});
		}
	}
}
