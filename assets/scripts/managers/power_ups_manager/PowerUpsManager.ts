import { IPowerUp } from './power_ups/interfaces/IPowerUp';
import { PowerUpsFactory } from './PowerUpsFactory';
import { FieldManager } from '../field_manager/FieldManager';

export enum EPowerUp {
	Shake,
}

export class PowerUpsManager {
	private _powerUps: IPowerUp[] = [];

	constructor(powerUps: any, fieldManager: FieldManager) {
		powerUps.forEach((config) => {
			this._powerUps.push(PowerUpsFactory.create(config, fieldManager));
		});
	}

	activatePowerUp(type: EPowerUp): void {
		var powerUp = this._powerUps.find((x) => x.getPowerUpType() == type);
		if (powerUp.canActivate()) {
			powerUp.activate();
		}
	}

	getCountPowerUp(type: EPowerUp): number {
		var powerUp = this._powerUps.find((x) => x.getPowerUpType() == type);
		return powerUp.count();
	}
}
