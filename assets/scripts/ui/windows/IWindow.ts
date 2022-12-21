export interface IWindow {
	show: (args: object[]) => void;
	hide: () => void;
	isShowing: () => boolean;
}
