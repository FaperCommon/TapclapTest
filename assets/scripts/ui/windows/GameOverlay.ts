import { _decorator, Component, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
const { ccclass, property } = _decorator;

@ccclass('GameOverlay')
export class GameOverlay extends BaseWindow {
	start() {
		super.start();
	}

	update(deltaTime: number) {
		super.update(deltaTime);
	}
}
