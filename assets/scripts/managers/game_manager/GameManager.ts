import { _decorator, Component, JsonAsset, Node, resources } from 'cc';
import { EPowerUp, PowerUpsManager } from '../power_ups_manager/PowerUpsManager';
import { FieldManager } from '../field_manager/FieldManager';
import loadConfig from '../../utils/loadConfig';

const { ccclass, property } = _decorator;

export enum EGameState {
	Game,
	Pause,
	GameOver,
}

@ccclass('GameManager')
export class GameManager extends Component {
	@property({ type: FieldManager })
	protected fieldManager: FieldManager;

	private _state: EGameState = EGameState.Game;
	private _powerUpsManager: PowerUpsManager;

	get FieldManager() {
		return this.fieldManager;
	}

	get State() {
		return this._state;
	}

	set State(value: EGameState) {
		//TODO Replace with Events
		this._state = value;
	}

	start() {
		console.log('[GameManager] GameManager initiated');
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
}
