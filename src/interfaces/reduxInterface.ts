export default interface IStore {
	id:string,
	userName: string,
	mainStore: IItesmsStore[],
}
export interface IItesmsStore { 
	id: number,
	title: string,
	addCard: boolean
	card:ICardItems []
} 
export interface ICardItems { 
	id: string,
	title: string,
}