import { FieldManager } from '../../field_manager/FieldManager';
import { EPowerUp } from '../PowerUpsManager';
import { GenericPowerUp } from './GenericPowerUp';
import { IActivePowerUp } from './interfaces/IActivePowerUp';
import { IPowerUp } from './interfaces/IPowerUp';

export class ActivePowerUp extends GenericPowerUp implements IActivePowerUp {
	protected _enabled: boolean = false;

	constructor(count: number, fieldManager: FieldManager) {
		super(count, fieldManager);
	}

	tileSelected(row: number, col: number) {
		throw new Error('Method not implemented.');
	}

	activate() {
		this._enabled = !this._enabled;
	}

	enabled(): boolean {
		return this._enabled;
	}
}
