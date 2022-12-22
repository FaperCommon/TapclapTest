import { _decorator, CCInteger, Component, Node, Vec2, Vec3 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('ProgressBar')
export class ProgressBar extends Component {
	@property({ type: CCInteger })
	protected minScale: number = 0;
	@property({ type: CCInteger })
	protected maxScale: number = 1.7;

	@property({ type: Node })
	protected progressBar: Node = null;

	start() {}

	setProgress(progress: number) {
		var scale = this.minScale + (this.maxScale - this.minScale) * progress;

		this.progressBar.setScale(new Vec3(scale, this.progressBar.scale.y));
	}

	update(deltaTime: number) {}
}
