import { FieldManager } from '../field_manager/FieldManager';
import { BlastPowerUp } from './power_ups/BlastPowerUp';
import { ShakePowerUp } from './power_ups/ShakePowerUp';
import { IPowerUp } from './power_ups/interfaces/IPowerUp';

export class PowerUpsFactory {
	public static create(config: any, fieldManager: FieldManager): IPowerUp {
		switch (config.type) {
			case 'Shake':
				return new ShakePowerUp(config.start_count, fieldManager);
			case 'Blast':
				return new BlastPowerUp(config.radius, config.start_count, fieldManager);
			default:
				throw new Error(`[PowerUpsFactory] type: ${config.type} not implemented`);
		}
	}
}
