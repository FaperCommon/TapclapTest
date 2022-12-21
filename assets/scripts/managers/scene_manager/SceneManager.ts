import { _decorator, Component, Director, director, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

export class SceneManager {
	static changeScene(sceneName: string) {
		var onSceneLaunched = (error, scene) => {
			if (!scene) {
				console.log(`[SceneManager] Load error: ${error}`);
			} else {
				console.log(`[SceneManager] Scene ${sceneName} loaded!`);
			}
		};

		if (
			sys.platform == sys.Platform.EDITOR_CORE ||
			sys.platform == sys.Platform.EDITOR_PAGE ||
			sys.Platform.DESKTOP_BROWSER
		) {
			this.changeSceneFromEditor(sceneName, onSceneLaunched);
		} else {
			this.changeSceneFromBuild(sceneName, onSceneLaunched);
		}
	}

	private static changeSceneFromEditor(sceneName: string, onSceneLaunched: Director.OnSceneLaunched) {
		director.loadScene(sceneName, onSceneLaunched);
	}

	private static changeSceneFromBuild(sceneName: string, onSceneLaunched: Director.OnSceneLaunched) {
		throw new Error('[SceneManager] changeSceneFromBuild non defined');
		// TODO Some asset bundles and etc
	}
}
