import { _decorator, Button, Component, Label, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
import { SceneManager } from '../../managers/scene_manager/SceneManager';
const { ccclass, property } = _decorator;

@ccclass('WinWindow')
export class WinWindow extends BaseWindow {
	@property({ type: Button })
	protected replayButton: Button;
	@property({ type: Button })
	protected menuButton: Button;

	// * For localization
	@property({ type: Label })
	protected replayButtonLabel: Label;
	@property({ type: Label })
	protected menuButtonLabel: Label;
	@property({ type: Label })
	protected victoryLabel: Label;

	start() {
		super.start();
		this.initialize();
	}

	initialize() {
		this.replayButton.clickEvents.push(super.buildEventHandler('onReplayButtonClick'));
		this.menuButton.clickEvents.push(super.buildEventHandler('onMenuButtonClick'));
	}

	update(deltaTime: number) {}

	onReplayButtonClick(event: Event, CustomEventData) {
		SceneManager.reloadScene();
	}

	onMenuButtonClick(event: Event, CustomEventData) {
		SceneManager.changeScene('main_menu');
	}
}
