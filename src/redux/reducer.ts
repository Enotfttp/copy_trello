import { reducerConstats } from "../constants/constants"
import IStore, { IItesmsStore } from "../interfaces/reduxInterface"
import nextId from "react-id-generator";



const defaultStore: IStore[] = JSON.parse(String(localStorage.getItem('allArray'))) ? JSON.parse(String(localStorage.getItem('allArray'))) : [] ;
const addStore: IStore = {
	id: '',
	userName: '',
	mainStore: [
		{
			id: 1, title: "TODO", addCard: true, card: []
		},
		{
			id: 2, title: "In Progress", addCard: true, card: []
		},
		{
			id: 3, title: "Testing", addCard: true, card: []
		},
		{
			id: 4, title: "Done", addCard: true, card: []
		}
	],
}


export const mainReducer = (state = defaultStore, action:any) => { 
	switch (action.type) {
		case reducerConstats.ACTIVE_CARD:
			return [...state.map((el: IStore) => {
				el.mainStore.map((item: IItesmsStore) => {
					if (action.payload.id === item.id) {
						item.addCard = action.payload.addCard
					} else if (!action.payload.addCard) {
						item.addCard = true
					}
					return item
				})
				return el
			})
			]
		case reducerConstats.CHANGE_TITLE_CARD:
			return [...state.map((el: IStore) => {
				if (el.userName === action.payload.name) {
					el.mainStore.map((item: IItesmsStore) => {
						if (action.payload.id === item.id) {
							item.card.push(action.payload.card)
						}
						return item
					})
				}
				return el
			})
			]
		case reducerConstats.CHANGE_NAME_COLUMN:
			return [...state.map((el: IStore) => {
				if (el.userName === action.payload.name) {
					el.mainStore.map((item: IItesmsStore) => {
						if (action.payload.id === item.id) {
							item.title = action.payload.title
						}
						return item
					})
				}
				return el
			})
			]
		case reducerConstats.SET_NEW_USER:
			state = [...state, { ...addStore, id: nextId(), userName: action.payload }]	
			const used:any =  {};
			const filtered = state.filter((obj:IStore) =>{
				 return obj.userName in used ? 0:(used[obj.userName]=1);
			});
			return filtered
		default:
			return state
	}
}
export const addCard = (payload: { id: number, addCard: boolean }) => ({ type: reducerConstats.ACTIVE_CARD, payload })
export const changeTitleCard = (payload: { id: number, card: {id: string,	title: string	}, name:string}) => ({ type: reducerConstats.CHANGE_TITLE_CARD, payload })
export const changeName = (payload: { id: number, title: string, name:string}) => ({ type: reducerConstats.CHANGE_NAME_COLUMN, payload })
export const setNameUser = (payload: string) => ({ type: reducerConstats.SET_NEW_USER, payload })




