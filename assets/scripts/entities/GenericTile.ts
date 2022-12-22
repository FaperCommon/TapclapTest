import { _decorator, Component, Node, Vec3, Sprite, ccenum, Enum, Vec2, director, CCInteger } from 'cc';
import { FieldManager } from '../managers/field_manager/FieldManager';
import { ITile } from './interfaces/ITile';
import { GenericEntity } from './GenericEntity';

const { ccclass, property } = _decorator;

export enum ETileType {
	Default,
}

export enum ETileColor {
	Red,
	Yellow,
	Blue,
	Purple,
	Green,
}

@ccclass('GenericTile')
export class GenericTile extends GenericEntity implements ITile {
	@property({ type: Enum(ETileType) })
	protected type: ETileType = ETileType.Default;

	@property({ type: Enum(ETileColor) })
	protected color: ETileColor = ETileColor.Blue;

	@property({ type: Enum(CCInteger) })
	protected score: number = 1;

	protected _fieldManager: FieldManager;
	protected _sprite: Sprite;
	protected _movementIntervalId: number;

	public get Sprite() {
		if (!this._sprite) {
			this._sprite = this.getComponent(Sprite);
		}
		return this._sprite;
	}

	onLoad() {
		this.node.on(Node.EventType.TOUCH_START, this.onClick, this);
	}

	onCreate(parent: Node) {
		super.onCreate(parent);

		// TODO Injection or something
		this._fieldManager = parent.getComponent(FieldManager);
	}

	onClick() {
		this._fieldManager.onTileClicked(this);
	}

	start() {
		super.start();
	}

	async blow(): Promise<void> {
		return Promise.resolve();
		// TODO Particles and another things
	}

	async moveOnPosition(pos: Vec3) {
		clearInterval(this._movementIntervalId);
		this._movementIntervalId = setInterval(() => {
			this.changePositionLerp(pos);
			if (Vec3.distance(this.node.position, pos) <= 0.5) {
				clearInterval(this._movementIntervalId);
			}
		}, 20);
	}

	private changePositionLerp(pos: Vec3) {
		let position = this.node.position;
		Vec3.lerp(position, this.node.position, pos, 0.1);

		this.node.setPosition(position);
	}

	getType() {
		return this.type;
	}

	getColor() {
		return this.color;
	}

	getScore() {
		return this.score;
	}

	getNode() {
		return this.node;
	}

	update(deltaTime: number) {
		super.update(deltaTime);
	}

	onDestroy() {
		clearInterval(this._movementIntervalId);
	}
}
