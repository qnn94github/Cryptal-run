import Phaser from "phaser";
import Overview from "../objects/Overview";
import ScoreBoard from "../objects/ScoreBoard";
import Header from "../objects/Header";
import MusicBtn from "../objects/MusicBtn";

export default class GameOver extends Phaser.Scene {
	overview!: Overview;
	header!: Header;
	scoreboard!: ScoreBoard;
	musicBtn!: MusicBtn;
	constructor() {
		super({
			key: "GameOver",
		});
	}
	init(): void {}
	preload(): void {
		this.load.pack("gamePack", "/public/assets/pack.json", "gamePack");
	}
	create(data: object): void {
		// MusicBtn
		this.musicBtn = new MusicBtn(this);
		if (data.sound) {
			if (!data.sound) {
				this.musicBtn.isMute = false;
				this.musicBtn.soundSprite.setFrame(0);
			} else {
				this.musicBtn.isMute = true;
				this.musicBtn.soundSprite.setFrame(1);
			}
		}
		this.overview = new Overview(this);
		this.scoreboard = new ScoreBoard(this);
		this.header = new Header(this);
		this.add
			.text(1700, 100, `score: ${data.score}`)
			.setDepth(6)
			.setFontSize(30)
			.setFontStyle("bold");
		this.add
			.text(870, 420, `${data.score}`)
			.setDepth(6)
			.setFontSize(30)
			.setFontStyle("bold");
	}
}
