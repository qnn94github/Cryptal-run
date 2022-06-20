import Phaser from "phaser";
import Overview from "../objects/Overview";
import OverLayInit from "../objects/OverLayInit";
import Header from "../objects/Header";
import MusicBtn from "../objects/MusicBtn";
export default class GameInit extends Phaser.Scene {
	header!: Header;
	overview!: Overview;
	overlay!: OverLayInit;
	musicBtn!: MusicBtn;
	constructor() {
		super({
			key: "GameInit",
		});
	}
	init(): void {
		this.registry.set("score", 0);
	}
	preload(): void {
		this.load.pack("gamePack", "/public/assets/pack.json", "gamePack");
		this.load.audio("mainTheme", "/public/assets/sound/mainTheme.ogg");
	}
	create(): void {
		// Overview
		this.overview = new Overview(this);
		// OverLay
		this.overlay = new OverLayInit(this);
		// header
		this.header = new Header(this);
		// MusicBtn
		this.musicBtn = new MusicBtn(this);
		// score
		this.add
			.text(1700, 100, `Score: ${this.registry.get("score")}`)
			.setDepth(6)
			.setFontSize(30)
			.setFontStyle("bold");
	}
}
