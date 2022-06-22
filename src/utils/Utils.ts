import Phaser from "phaser";
import { GAME_RATIO } from "../constants/GameConst";
export default class Utils {
	/**
	 * Calculate game size according to window size and game ratio
	 * @returns {GameSize} size - new game size
	 */
	static getGameSize(): GameSize {
		const winWidth = window.innerWidth;
		const winHeight = window.innerHeight;

		let gameWidth = winWidth;
		let gameHeight = winHeight;

		if (winWidth >= winHeight) {
			gameWidth = GAME_RATIO * gameHeight;
		} else {
			gameHeight = gameWidth / GAME_RATIO;
			if (gameHeight > winHeight) {
				gameHeight = winHeight;
				gameWidth = GAME_RATIO * gameHeight;
			}
		}

		return {
			width: Math.round(gameWidth),
			height: Math.round(gameHeight),
		};
	}
}
export interface GameSize {
	width: number;
	height: number;
}
