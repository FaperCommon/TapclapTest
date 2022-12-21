import { FieldManager } from '../../field_manager/FieldManager';
import { EPowerUp } from '../PowerUpsManager';
import { GenericPowerUp } from './GenericPowerUp';
import { IPowerUp } from './interfaces/IPowerUp';

export class ShakePowerUp extends GenericPowerUp {
	constructor(count: number, fieldManager: FieldManager) {
		super(count, fieldManager);
		this._powerUpType = EPowerUp.Shake;
	}

	activate() {
		super.activate();
		this._fieldManager.shake();
	}
}
