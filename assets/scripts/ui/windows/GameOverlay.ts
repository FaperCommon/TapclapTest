import { _decorator, Button, Component, EventHandler, find, Label, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
import { PauseWindow } from './PauseWindow';
import { GameManager } from '../../managers/game_manager/GameManager';
import { EPowerUp } from '../../managers/power_ups_manager/PowerUpsManager';

const { ccclass, property } = _decorator;

@ccclass('GameOverlay')
export class GameOverlay extends BaseWindow {
	@property({ type: Button })
	protected pauseButton: Button;
	@property({ type: Button })
	protected shakeButton: Button;

	// * For localization
	@property({ type: Label })
	protected shakeButtonLabel: Label;

	@property({ type: GameManager })
	protected gameManager: GameManager;

	start() {
		console.log(this.gameManager);
		super.start();
		this.initialize();
	}

	initialize() {
		this.pauseButton.clickEvents.push(super.buildEventHandler('onPauseButtonClick'));
		this.shakeButton.clickEvents.push(super.buildEventHandler('onShakeButtonClick'));

		this.gameManager.getPowerUpsManager().then((manager) => {
			this.shakeButtonLabel.string = `Shake: ${manager.getCountPowerUp(EPowerUp.Shake)}`;
		});
	}

	update(deltaTime: number) {}

	onPauseButtonClick(event: Event, CustomEventData) {
		this._windowsManager.hide(GameOverlay);
		this._windowsManager.show(PauseWindow);
	}

	onShakeButtonClick(event: Event, CustomEventData) {
		this.gameManager.getPowerUpsManager().then((manager) => {
			manager.activatePowerUp(EPowerUp.Shake);
			this.shakeButtonLabel.string = `Shake: ${manager.getCountPowerUp(EPowerUp.Shake)}`;
		});
	}
}
