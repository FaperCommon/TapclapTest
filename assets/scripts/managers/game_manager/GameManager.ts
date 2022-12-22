import { _decorator, Component, JsonAsset, Node, resources } from 'cc';
import { EPowerUp, PowerUpsManager } from '../power_ups_manager/PowerUpsManager';
import { FieldManager } from '../field_manager/FieldManager';
import loadConfig from '../../utils/loadConfig';
import { IObserver } from '../../interfaces/IObserver';
import { ISubject } from '../../interfaces/ISubject';
import { WindowsManager } from '../../ui/windows_manager/WindowsManager';
import { GameOverWindow } from '../../ui/windows/GameOverWindow';

const { ccclass, property } = _decorator;

export enum EGameState {
	Game,
	Pause,
	GameOver,
}

@ccclass('GameManager')
export class GameManager extends Component implements ISubject, IObserver {
	@property({ type: FieldManager })
	protected fieldManager: FieldManager;

	@property({ type: WindowsManager })
	protected windowManager: WindowsManager;

	private _state: EGameState = EGameState.Game;
	private _powerUpsManager: PowerUpsManager;
	private _observers: IObserver[] = [];

	get FieldManager() {
		return this.fieldManager;
	}

	get State() {
		return this._state;
	}

	set State(value: EGameState) {
		this._state = value;
		this.notify();
	}

	start() {
		this.fieldManager.attach(this);
		console.log('[GameManager] GameManager initiated');
	}

	callback(subject: ISubject): void {
		if ((subject as FieldManager) && !this.fieldManager.hasMoves()) {
			this._state = EGameState.GameOver;
			this.windowManager.show(GameOverWindow);
			this.notify();
		}
	}

	getPowerUpsManager(): Promise<PowerUpsManager> {
		if (this._powerUpsManager) {
			return Promise.resolve(this._powerUpsManager);
		} else {
			return loadConfig('configs/powerUps')
				.then((config) => {
					return (this._powerUpsManager = new PowerUpsManager(config.power_ups, this.fieldManager));
				})
				.catch((err) => {
					console.log(`[GameManager] Config load error ${err}`);
					return err;
				});
		}
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
			return console.log('[GameManager] Subject: Nonexistent observer.');
		}

		this._observers.splice(observerIndex, 1);
	}

	notify(): void {
		for (const observer of this._observers) {
			observer.callback(this);
		}
	}
}
