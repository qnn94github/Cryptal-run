import Phaser from 'phaser';
import Overview from '../objects/Overview';
import OverLayInit from '../objects/OverLayInit';

export default class GameInit extends Phaser.Scene {
    overview !: Overview;
    overlay !: OverLayInit;
    constructor() {
        super({
            key: 'GameInit',
        });
    }
    init(): void {}
	preload(): void {
		this.load.pack("gamePack", "/public/assets/pack.json", "gamePack");
	}
    create(): void {
        // Overview
        this.overview = new Overview(this);
        // OverLay
        this.overlay = new OverLayInit(this);
    }
}