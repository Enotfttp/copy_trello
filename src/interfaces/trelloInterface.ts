import { ICardItems } from "./reduxInterface"

export interface IApp { 
	
}
export interface IColumn { 
	id:number,
	title: string,
	addCard: boolean,
	card: ICardItems[],
	name:string
}
export interface ICard { 
	title: string,
	idCard: string,
	name:string,
	idColumn:number
}
export interface IDescriptionWindow { 
	closeWindow: () => void,
	name: string,
	idColumn: number,
	idCard: string,
	title:string
}