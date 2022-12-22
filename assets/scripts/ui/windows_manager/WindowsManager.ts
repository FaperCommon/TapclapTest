import { _decorator, Component, Node } from 'cc';
import { IWindow } from '../windows/interfaces/IWindow';
import { BaseWindow } from '../windows/BaseWindow';

const { ccclass, property } = _decorator;

@ccclass('WindowsManager')
export class WindowsManager extends Component {
	protected readonly _windows: IWindow[] = [];
	protected readonly _openedWindows: IWindow[] = [];

	start() {
		this._windows.push(...this.getComponentsInChildren(BaseWindow));
		console.log('[WindowsManager] Initialized');
	}

	update(deltaTime: number) {}

	public getWindow(type: any): IWindow {
		for (var i = 0; i < this._windows.length; i++) {
			if (this._windows[i] instanceof type) {
				return this._windows[i];
			}
		}

		throw Error('[WindowsManager] Window not find');
	}

	show(type: any, args: object[] = null) {
		var window = this.getWindow(type);
		this.showInternal(window as IWindow, args);
	}

	private showInternal(window: IWindow, args: object[]) {
		window.show(args);
		this._openedWindows.push(window);
	}

	hide(type: any) {
		var window = this.getWindow(type) as IWindow;
		const index = this._windows.indexOf(window);

		if (index !== -1) {
			this._windows[index].hide();
		}

		this._openedWindows.splice(index, 1);
	}

	isShowingWindow(type: any): boolean {
		return this._windows.some((w) => w instanceof type && w.isShowing());
	}

	isShowingAny(): boolean {
		return this._windows.some((x) => x.isShowing());
	}

	getShowingWindows(): IWindow[] {
		return this._windows.filter((x) => x.isShowing());
	}

	hideAll() {
		this._windows.forEach((w) => {
			if (w.isShowing()) {
				w.hide();
			}
		});

		this._openedWindows.splice(0);
	}
}
