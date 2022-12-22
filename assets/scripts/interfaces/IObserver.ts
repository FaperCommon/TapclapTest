import { ISubject } from './ISubject';

export interface IObserver {
	callback(subject: ISubject): void;
}
