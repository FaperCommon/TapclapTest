import { _decorator, Button, Component, EventHandler, Label, Node } from 'cc';
import { BaseWindow } from './BaseWindow';
import { SceneManager } from '../../managers/scene_manager/SceneManager';
import { GameOverlay } from './GameOverlay';

const { ccclass, property } = _decorator;

@ccclass('PauseWindow')
export class PauseWindow extends BaseWindow {
	@property({ type: Button })
	protected menuButton: Button;
	@property({ type: Button })
	protected resumeButton: Button;

	// * For localization
	@property({ type: Label })
	protected menuButtonLabel: Label;
	@property({ type: Label })
	protected resumeButtonLabel: Label;

	start() {
		super.start();
		this.initialize();
	}

	initialize() {
		this.menuButton.clickEvents.push(super.buildEventHandler('onMenuButtonClick'));
		this.resumeButton.clickEvents.push(super.buildEventHandler('onResumeClick'));
	}

	update(deltaTime: number) {}

	onMenuButtonClick(event: Event, CustomEventData) {
		//TODO Remove hardcode, move scene change to gamemanager
		SceneManager.changeScene('main_menu');
	}

	onResumeClick(event: Event, CustomEventData) {
		this._windowsManager.hide(PauseWindow);
		this._windowsManager.show(GameOverlay);
	}

	onDestroy() {}
}
