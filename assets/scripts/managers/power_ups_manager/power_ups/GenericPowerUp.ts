import { FieldManager } from '../../field_manager/FieldManager';
import { EPowerUp } from '../PowerUpsManager';
import { IPowerUp } from './interfaces/IPowerUp';

export class GenericPowerUp implements IPowerUp {
	protected _count: number;
	protected _fieldManager: FieldManager;
	protected _powerUpType: EPowerUp;

	constructor(count: number, fieldManager: FieldManager) {
		this._count = count;
		this._fieldManager = fieldManager;
	}

	getPowerUpType() {
		return this._powerUpType;
	}

	activate() {
		this._count--;
	}

	count() {
		return this._count;
	}

	canActivate() {
		return this._count > 0;
	}
}
