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
	name: string,
	idCard:string
}