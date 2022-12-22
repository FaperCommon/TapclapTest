import { _decorator, Component, JsonAsset, Node, resources } from 'cc';
import { EPowerUp, PowerUpsManager } from '../power_ups_manager/PowerUpsManager';
import { FieldManager } from '../field_manager/FieldManager';
import loadConfig from '../../utils/loadConfig';
import { IObserver } from '../../interfaces/IObserver';
import { ISubject } from '../../interfaces/ISubject';
import { WindowsManager } from '../../ui/windows_manager/WindowsManager';
import { GameOverWindow } from '../../ui/windows/GameOverWindow';
import { WinWindow } from '../../ui/windows/WinWindow';

const { ccclass, property } = _decorator;

export enum EGameState {
	Game,
	Pause,
	GameOver,
	Win,
}

@ccclass('GameManager')
export class GameManager extends Component implements ISubject, IObserver {
	@property({ type: WindowsManager })
	protected windowManager: WindowsManager = null;

	private _state: EGameState;
	private _powerUpsManager: PowerUpsManager;
	private _fieldManager: FieldManager = null;
	private _scoreGoal: number;
	private _movesGoal: number;
	private _observers: IObserver[] = [];

	get PowerUpsManager() {
		return this._powerUpsManager;
	}

	get State() {
		return this._state;
	}

	set State(value: EGameState) {
		if (this._state != value) {
			this._state = value;
			this.changeState();

			this.notify();
		}
	}

	start() {
		this._fieldManager = this.getComponent(FieldManager);
		this._fieldManager.attach(this);
		this.initialize();
		console.log('[GameManager] GameManager Initialized');
	}

	initialize() {
		loadConfig('configs/powerUps')
			.then((config) => {
				this._powerUpsManager = new PowerUpsManager(config.power_ups, this._fieldManager);
			})
			.then(() => {
				loadConfig('configs/game')
					.then((config) => {
						this._scoreGoal = config.score_goal;
						this._movesGoal = config.moves_goal;
						this._fieldManager.initialize(config.field_size.rows, config.field_size.cols);
						this.State = EGameState.Game;
					})
					.catch((err) => {
						console.log(`[GameManager] Config load error ${err}`);
					});
			})
			.catch((err) => {
				console.log(`[GameManager] Config load error ${err}`);
				return err;
			});
	}

	callback(subject: ISubject): void {
		if (subject as FieldManager) {
			this.checkState();
		}
	}

	getProgress() {
		return this._fieldManager.getScore() / this._scoreGoal;
	}

	checkState() {
		if (
			(!this._fieldManager.hasMoves() || this._fieldManager.getMoves() >= this._movesGoal) &&
			this._fieldManager.getScore() < this._scoreGoal
		) {
			console.log(this._fieldManager.getScore());
			console.log(this._scoreGoal);
			this.State = EGameState.GameOver;
		} else if (this._fieldManager.getScore() >= this._scoreGoal) {
			this.State = EGameState.Win;
		}
	}

	changeState() {
		switch (this.State) {
			case EGameState.Win:
				this.windowManager.show(WinWindow);
				break;
			case EGameState.GameOver:
				this.windowManager.show(GameOverWindow);
				break;
		}
	}

	getMovesGoal() {
		return this._movesGoal;
	}

	getScoreGoal() {
		return this._scoreGoal;
	}

	getFieldManager() {
		return this._fieldManager;
	}

	update(deltaTime: number) {}

	attach(observer: IObserver): void {
		const isExist = this._observers.find((x) => x == observer);
		if (isExist) {
			return console.log('[GameManager] Subject: Observer has been attached already.');
		}

		this._observers.push(observer);
	}

	detach(observer: IObserver): void {
		const observerIndex = this._observers.indexOf(observer);
		if (observerIndex === -1) {
			return console.log('[GameManager] Subject: Non existent observer.');
		}

		this._observers.splice(observerIndex, 1);
	}

	notify(): void {
		for (const observer of this._observers) {
			observer.callback(this);
		}
	}
}
