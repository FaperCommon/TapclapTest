import { _decorator, Component, Vec3, CCInteger, math, Prefab } from 'cc';
import { GenericTile } from '../../entities/GenericTile';
import { PoolsManager } from '../pools_manager/PoolsManager';

const { randomRangeInt } = math;
const { ccclass, property } = _decorator;

@ccclass('FieldManager')
export class FieldManager extends Component {
	@property({ type: CCInteger })
	protected xOffset: number = 0;
	@property({ type: CCInteger })
	protected yOffset: number = 0;
	@property({ type: CCInteger })
	protected tileSize: number = 175;

	@property({ type: CCInteger })
	protected rowsCount: number = 0;
	@property({ type: CCInteger })
	protected colsCount: number = 0;

	@property({ type: Prefab, tooltip: 'Must be ITile' })
	protected tilesPrefabs: Prefab[] = [];

	protected _field: GenericTile[][];
	protected _poolsManager: PoolsManager;

	start() {
		this._poolsManager = new PoolsManager(this.tilesPrefabs);
		this.initField();
	}

	update(deltaTime: number) {}

	initField() {
		this._field = [];
		for (var i = 0; i < this.rowsCount; i++) {
			this._field[i] = [];

			for (var j = 0; j < this.colsCount; j++) {
				this._field[i][j] = this.createTile(j, i, Vec3.ZERO);
				this._field[i][j].getNode().setSiblingIndex(this.rowsCount - i);
			}
		}

		console.log('[FieldManager] field initiated');
	}

	createTile(row: number, col: number, position: Vec3): GenericTile {
		var tileNumber = randomRangeInt(0, this.tilesPrefabs.length);

		var tile = this._poolsManager.spawn(this.tilesPrefabs[tileNumber], this.node, position) as GenericTile;

		tile.moveOnPosition(new Vec3(this.xOffset + row * this.tileSize, this.yOffset - col * this.tileSize));
		return tile;
	}

	shake() {
		for (var i = 0; i < this.rowsCount; i++) {
			for (var j = 0; j < this.colsCount; j++) {
				var newTileNum = randomRangeInt(i * this.colsCount + j, this.colsCount * this.rowsCount);
				var buff = this._field[i][j];
				this._field[i][j] = this._field[Math.floor(newTileNum / this.colsCount)][newTileNum % this.colsCount];
				this._field[i][j].getNode().setSiblingIndex(this.rowsCount - i);
				this._field[i][j].moveOnPosition(
					new Vec3(this.xOffset + j * this.tileSize, this.yOffset - i * this.tileSize)
				);
				this._field[Math.floor(newTileNum / this.colsCount)][newTileNum % this.colsCount] = buff;
			}
		}
	}

	onTileClicked(tile: GenericTile) {
		var col = this._field.find((x) => x.some((y) => y == tile));
		var iRow = this._field.indexOf(col);
		var jCol = col.indexOf(tile);
		this.destroyTile(iRow, jCol);
		this.moveTiles();
		//TODO Insert particles, movement animation, AudioManager etc
	}

	moveTiles() {
		for (var i = 0; i < this.rowsCount - 1; i++) {
			for (var j = this.rowsCount - 1; j >= 0; j--) {
				// Drop down if null
				if (!this._field[j][i]) {
					for (var k = j; k >= 0; k--) {
						if (this._field[k][i]) {
							this._field[j][i] = this._field[k][i];
							this._field[j][i].moveOnPosition(
								new Vec3(this.xOffset + i * this.tileSize, this.yOffset - j * this.tileSize)
							);
							this._field[k][i] = null;

							break;
						}
					}
				}

				// If still null - spawn new
				if (!this._field[j][i]) {
					this._field[j][i] = this.createTile(
						i,
						j,
						new Vec3(this.xOffset + i * this.tileSize, this.yOffset + this.tileSize)
					);
				}
			}
		}
	}

	destroyTile(row: number, col: number, isRecursed: boolean = false) {
		var color = this._field[row][col].getColor();

		var hasLeftNeighbor = col > 0 && this._field[row][col - 1] && this._field[row][col - 1].getColor() == color;

		var hasTopNeighbor = row > 0 && this._field[row - 1][col] && this._field[row - 1][col].getColor() == color;

		var hasRightNeighbor =
			col < this.colsCount - 1 && this._field[row][col + 1] && this._field[row][col + 1].getColor() == color;

		var hasBottomNeighbor =
			row < this.rowsCount - 1 && this._field[row + 1][col] && this._field[row + 1][col].getColor() == color;

		if (isRecursed || hasLeftNeighbor || hasTopNeighbor || hasRightNeighbor || hasBottomNeighbor) {
			var tile = this._field[row][col];
			this._field[row][col] = null;
			tile.blow().then(() => {
				this._poolsManager.despawn(tile.getNode());
			});
		}

		if (hasLeftNeighbor && this._field[row][col - 1]) {
			this.destroyTile(row, col - 1, true);
		}

		if (hasTopNeighbor && this._field[row - 1][col]) {
			this.destroyTile(row - 1, col, true);
		}

		if (hasRightNeighbor && this._field[row][col + 1]) {
			this.destroyTile(row, col + 1, true);
		}

		if (hasBottomNeighbor && this._field[row + 1][col]) {
			this.destroyTile(row + 1, col, true);
		}
	}
}
