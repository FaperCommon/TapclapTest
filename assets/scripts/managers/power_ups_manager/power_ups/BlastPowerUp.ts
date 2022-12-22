import { FieldManager } from '../../field_manager/FieldManager';
import { EPowerUp } from '../PowerUpsManager';
import { ActivePowerUp } from './ActivePowerUp';
import { GenericPowerUp } from './GenericPowerUp';
import { IPowerUp } from './interfaces/IPowerUp';

export class BlastPowerUp extends ActivePowerUp {
	private _radius: number;

	constructor(_radius: number, count: number, fieldManager: FieldManager) {
		super(count, fieldManager);
		this._powerUpType = EPowerUp.Blast;
		this._radius = _radius;
	}

	activate() {
		super.activate();
	}

	tileSelected(row: number, col: number) {
		this._enabled = !this._enabled;
		this._count--;
		this._fieldManager.blast(row, col, this._radius);
	}
}
