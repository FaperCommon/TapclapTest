import { EPowerUp } from '../../PowerUpsManager';
import { IPowerUp } from './IPowerUp';

export interface IActivePowerUp extends IPowerUp {
	tileSelected(row: number, col: number): void;
	enabled(): boolean;
}
