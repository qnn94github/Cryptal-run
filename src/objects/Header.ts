import Phaser from "phaser";

export default class Header {
    constructor(scene: Phaser.Scene) {
        scene.add.rectangle(0,0,1900,60,0x18216D).setOrigin(0,0);
        scene.add.text(10, 20, "Market",{fontSize: '20px', color: '#ffffff'}).setOrigin(0,0);
        scene.add.text(100, 20, "Create NFT",{fontSize: '20px', color: '#ffffff'}).setOrigin(0,0);
        scene.add.text(250, 20, "My NFTs",{fontSize: '20px', color: '#ffffff'}).setOrigin(0,0);
        scene.add.text(350, 20, "Play to Earn",{fontSize: '20px', color: '#ffffff'}).setOrigin(0,0);
    }
}