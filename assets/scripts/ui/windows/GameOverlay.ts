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
	@property({ type: Button })
	protected blastButton: Button;

	// * For localization
	@property({ type: Label })
	protected shakeButtonLabel: Label;
	@property({ type: Label })
	protected blastButtonLabel: Label;
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
		this.blastButton.clickEvents.push(super.buildEventHandler('onBlastButtonClick'));

		this.fieldManager.attach(this);
	}

	update(deltaTime: number) {}

	callback(subject: ISubject) {
		if (subject as FieldManager) {
			this.updateUI();
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

		this.gameManager.PowerUpsManager.activatePowerUp(EPowerUp.Shake);

		this.updateUI();
	}

	onBlastButtonClick(event: Event, CustomEventData) {
		if (this.gameManager.State != EGameState.Game) {
			return;
		}

		this.gameManager.PowerUpsManager.activatePowerUp(EPowerUp.Blast);

		this.updateUI();
	}

	updateUI() {
		this.blastButtonLabel.string = `Blast: ${this.gameManager.PowerUpsManager.getCountPowerUp(EPowerUp.Blast)}`;
		this.shakeButtonLabel.string = `Shake: ${this.gameManager.PowerUpsManager.getCountPowerUp(EPowerUp.Shake)}`;

		this.scoreLabel.string = `Score: ${this.fieldManager.getScore()} / ${this.gameManager.getScoreGoal()}`;
		this.movesLabel.string = `Moves: ${this.fieldManager.getMoves()} / ${this.gameManager.getMovesGoal()}`;
		this.progressBar.setProgress(this.gameManager.getProgress());
	}
}
