import { IPowerUp } from './power_ups/interfaces/IPowerUp';
import { PowerUpsFactory } from './PowerUpsFactory';
import { FieldManager } from '../field_manager/FieldManager';
import { IActivePowerUp } from './power_ups/interfaces/IActivePowerUp';
import { ActivePowerUp } from './power_ups/ActivePowerUp';

export enum EPowerUp {
	Shake,
	Blast,
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

		if (!powerUp) {
			throw new Error(`[PowerUpsManager] type: ${type} not implemented`);
		}

		if (powerUp.canActivate()) {
			powerUp.activate();
		}
	}

	tileSelected(row: number, col: number) {
		this._powerUps.forEach((x) => {
			if (x instanceof ActivePowerUp) {
				(x as IActivePowerUp).tileSelected(row, col);
			}
		});
	}

	hasEnabledActivePowerUp(): boolean {
		return this._powerUps.some((x) => x instanceof ActivePowerUp && (x as IActivePowerUp).enabled());
	}

	getCountPowerUp(type: EPowerUp): number {
		var powerUp = this._powerUps.find((x) => x.getPowerUpType() == type);
		return powerUp.count();
	}
}
