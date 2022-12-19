import { _decorator, Component, Node, Vec3 } from 'cc';

export interface IPoolable {
	onCreate: (parent: Node) => void;
	onSpawn: (parent: Node, pos: Vec3) => void;
	onDespawn: () => void;
}
