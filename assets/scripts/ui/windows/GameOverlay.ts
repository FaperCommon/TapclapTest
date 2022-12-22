import { _decorator, Button, Component, EventHandler, find, Label, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
import { PauseWindow } from './PauseWindow';
import { EGameState, GameManager } from '../../managers/game_manager/GameManager';
import { EPowerUp } from '../../managers/power_ups_manager/PowerUpsManager';
import { IObserver } from '../../interfaces/IObserver';
import { ISubject } from '../../interfaces/ISubject';
import { FieldManager } from '../../managers/field_manager/FieldManager';
import { ProgressBar } from '../ProgressBar';

const { ccclass, property } = _decorator;

@ccclass('GameOverlay')
export class GameOverlay extends BaseWindow implements IObserver {
	@property({ type: Button })
	protected pauseButton: Button;
	@property({ type: Button })
	protected shakeButton: Button;

	// * For localization
	@property({ type: Label })
	protected shakeButtonLabel: Label;
	@property({ type: Label })
	protected scoreLabel: Label;
	@property({ type: Label })
	protected movesLabel: Label;

	@property({ type: ProgressBar })
	protected progressBar: ProgressBar;

	@property({ type: GameManager })
	protected gameManager: GameManager = null;
	@property({ type: FieldManager })
	protected fieldManager: FieldManager = null;

	start() {
		super.start();
		this.initialize();
	}

	initialize() {
		this.pauseButton.clickEvents.push(super.buildEventHandler('onPauseButtonClick'));
		this.shakeButton.clickEvents.push(super.buildEventHandler('onShakeButtonClick'));

		this.gameManager.getPowerUpsManager().then((manager) => {
			this.shakeButtonLabel.string = `Shake: ${manager.getCountPowerUp(EPowerUp.Shake)}`;
		});

		this.fieldManager.attach(this);
	}

	update(deltaTime: number) {}

	callback(subject: ISubject) {
		if (subject as FieldManager) {
			this.scoreLabel.string = `Score: ${this.fieldManager.getScore()} / ${this.gameManager.getScoreGoal()}`;
			this.movesLabel.string = `Moves: ${this.fieldManager.getMoves()} / ${this.gameManager.getMovesGoal()}`;
			this.progressBar.setProgress(this.gameManager.getProgress());
		}
	}

	onPauseButtonClick(event: Event, CustomEventData) {
		this._windowsManager.hide(GameOverlay);
		this._windowsManager.show(PauseWindow);
	}

	onShakeButtonClick(event: Event, CustomEventData) {
		if (this.gameManager.State != EGameState.Game) {
			return;
		}

		this.gameManager.getPowerUpsManager().then((manager) => {
			manager.activatePowerUp(EPowerUp.Shake);
			this.shakeButtonLabel.string = `Shake: ${manager.getCountPowerUp(EPowerUp.Shake)}`;
		});
	}
}
