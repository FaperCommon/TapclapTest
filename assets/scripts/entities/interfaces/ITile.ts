import { Component, Vec3, Node } from 'cc';
import { ETileColor, ETileType } from '../GenericTile';

export interface ITile {
	getNode: () => Node;
	moveOnPosition: (pos: Vec3) => void;
	blow: () => Promise<void>;
	getColor: () => ETileColor;
	getType: () => ETileType;
}
