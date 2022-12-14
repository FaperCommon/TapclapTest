import { _decorator, Button, Component, director, EventHandler, Label, Node } from 'cc';
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
	@property({ type: Button })
	protected replayButton: Button;

	// * For localization
	@property({ type: Label })
	protected menuButtonLabel: Label;
	@property({ type: Label })
	protected resumeButtonLabel: Label;
	@property({ type: Label })
	protected replayButtonLabel: Label;

	start() {
		super.start();
		this.initialize();
	}

	initialize() {}

	update(deltaTime: number) {}

	onMenuButtonClick(event: Event, CustomEventData) {
		//TODO Remove hardcode, move scene change to gamemanager
		SceneManager.changeScene('main_menu');
	}

	onReplayClick(event: Event, CustomEventData) {
		SceneManager.reloadScene();
	}

	onResumeClick(event: Event, CustomEventData) {
		this._windowsManager.hide(PauseWindow);
		this._windowsManager.show(GameOverlay);
	}

	onDestroy() {}
}
