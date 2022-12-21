import { _decorator, Component, EventHandler, Node } from 'cc';
import { IWindow } from './IWindow';
import { WindowsManager } from '../windows_manager/WindowsManager';

const { ccclass, property } = _decorator;

@ccclass('BaseWindow')
export class BaseWindow extends Component implements IWindow {
	protected _isShowing: boolean = false;
	protected _windowsManager: WindowsManager;

	start() {
		this._windowsManager = this.node.parent.getComponent(WindowsManager);
	}

	show(args: object[] = null) {
		this.node.active = true;
		this._isShowing = true;
	}

	hide() {
		this.node.active = false;
		this._isShowing = false;
	}

	protected buildEventHandler(handler: string): EventHandler {
		var buttonEvent = new EventHandler();
		buttonEvent.target = this.node;
		buttonEvent.component = BaseWindow.name;
		buttonEvent.handler = handler;
		return buttonEvent;
	}

	update(deltaTime: number) {}

	isShowing(): boolean {
		return this._isShowing;
	}
}
