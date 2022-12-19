import { _decorator, Component, Node, Vec3 } from 'cc';
import { IPoolable } from './interfaces/IPoolable';
const { ccclass, property } = _decorator;

@ccclass('GenericEntity')
export class GenericEntity extends Component implements IPoolable {
	start() {}

	update(deltaTime: number) {}

	onCreate(parent: Node) {}

	onSpawn(parent: Node, pos: Vec3) {
		this.node.parent = parent;
		this.node.setPosition(pos);
	}

	onDespawn() {}
}
