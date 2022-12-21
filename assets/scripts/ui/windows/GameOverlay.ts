import { _decorator, Button, Component, EventHandler, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
import { PauseWindow } from './PauseWindow';

const { ccclass, property } = _decorator;

@ccclass('GameOverlay')
export class GameOverlay extends BaseWindow {
	@property({ type: Button })
	protected pauseButton: Button;

	start() {
		super.start();
		this.initialize();
	}

	initialize() {
		this.pauseButton.clickEvents.push(super.buildEventHandler('onPauseButtonClick'));
	}

	update(deltaTime: number) {}

	onPauseButtonClick(event: Event, CustomEventData) {
		this._windowsManager.hide(GameOverlay);
		this._windowsManager.show(PauseWindow);
	}
}
