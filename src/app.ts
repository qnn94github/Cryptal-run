import "phaser";
const config: Phaser.Types.Core.GameConfig = {
  title: "Cryptal Run",
  width: 1900,
  height: 900,
  parent: "game",
  backgroundColor: "#18216D"
};
export class StarfallGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new StarfallGame(config);
};