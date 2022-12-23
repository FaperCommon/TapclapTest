import { _decorator, Button, Component, EventHandler, Label, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
import { SceneManager } from '../../managers/scene_manager/SceneManager';

const { ccclass, property } = _decorator;

@ccclass('MainMenuWindow')
export class MainMenuWindow extends BaseWindow {
	@property({ type: Button })
	protected playButton: Button;

	// * For localization
	@property({ type: Label })
	protected playButtonLabel: Label;

	start() {
		super.start();
		this.initialize();
	}

	initialize() {}

	update(deltaTime: number) {}

	onPlayButtonClick(event: Event, CustomEventData) {
		//TODO Remove hardcode, move scene change to gamemanager
		SceneManager.changeScene('game');
	}

	onDestroy() {}
}
