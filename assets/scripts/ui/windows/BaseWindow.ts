import { _decorator, Component, Node } from 'cc';
import { IWindow } from './IWindow';

const { ccclass, property } = _decorator;

@ccclass('BaseWindow')
export class BaseWindow extends Component implements IWindow {

	start() {
		//this.node.active = false;
	}

	show() {
		this.node.active = true;
	}

	hide() {
		this.node.active = false;
	}

	update(deltaTime: number) {}
}
