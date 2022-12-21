import { EPowerUp } from '../../PowerUpsManager';

export interface IPowerUp {
	activate: () => void; // Can be Promise for animation
	count: () => number;
	canActivate: () => boolean;
	getPowerUpType: () => EPowerUp;
}
