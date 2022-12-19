import { _decorator, Component, instantiate, Node, NodePool, Prefab, Vec3 } from 'cc';
import { GenericEntity } from '../../entities/GenericEntity';

const { ccclass, property } = _decorator;

export class PoolsManager {
	protected _map: Map<String, NodePool>;

	constructor(prefabs: Prefab[]) {
		this._map = new Map<String, NodePool>();

		prefabs.forEach((prefab) => {
			this._map.set(prefab.name, new NodePool());
		});
	}

	spawn(prefab: Prefab, parent: Node, position: Vec3): GenericEntity {
		let pool = this._map.get(prefab.name);
		let object: GenericEntity = null;
		if (pool.size() > 0) {
			object = pool.get().getComponent(GenericEntity);
		} else {
			object = instantiate(prefab).getComponent(GenericEntity);
			object.onCreate(parent);
		}

		object.onSpawn(parent, position);

		return object;
	}

	despawn(node: Node) {
		let pool = this._map.get(node.name);
		pool.put(node);
	}
}
