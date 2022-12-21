import { _decorator, Component, Node } from 'cc';
import { WindowsManager } from './WindowsManager';
import { GameOverlay } from '../windows/GameOverlay';

const { ccclass, property } = _decorator;

@ccclass('GameWindowsManager')
export class GameWindowsManager extends WindowsManager {
	start() {
		super.start();
		this.hideAll();
		this.show(GameOverlay);
	}
}
