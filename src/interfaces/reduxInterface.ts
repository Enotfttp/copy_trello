export default interface IStore {
	user:IUser[],
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
export interface IUser { 
	id: string, 
	name: string, 
	idCard:ICardUser[]
}
export interface ICardUser { 
	idColumn: number,
	idCard:string
}