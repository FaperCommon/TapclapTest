import { _decorator, Component, Node } from 'cc';
import { WindowsManager } from './WindowsManager';
import { MainMenuWindow } from '../windows/MainMenuWindow';

const { ccclass, property } = _decorator;

@ccclass('MainMenuWindowsManager')
export class MainMenuWindowsManager extends WindowsManager {
	start() {
		super.start();
		this.hideAll();
		this.show(MainMenuWindow);
	}
}
