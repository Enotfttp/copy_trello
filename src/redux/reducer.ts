import { addStore, reducerConstats } from "../constants/constants"
import IStore, { IItesmsStore, ICardItems } from "../interfaces/reduxInterface"
import nextId from "react-id-generator";



const defaultStore: IStore[] = JSON.parse(String(localStorage.getItem('allArray'))) ? JSON.parse(String(localStorage.getItem('allArray'))) : [] ;

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
			const newArray = state.filter((item:IStore) =>{
				 return item.userName in used ? 0:(used[item.userName]=1);
			});
			return newArray
		case reducerConstats.DELETE_CARD:
			return [...state.map((el: IStore) => {
			const mainStore = el.mainStore.map((item: IItesmsStore) => {
						const nextItem = item.card.filter((elem: ICardItems) => {
							if (elem.id !== action.payload) {
								return true
							} else {
								return false
							}
						})
					return {
						card:nextItem,
						id: item.id,
						title: item.title,
						addCard: item.addCard
					}
				})
				return {
					id: el.id,
					userName: el.userName,
					mainStore: mainStore,
				}
			})]
		case reducerConstats.EDIT_CARD:
			return [...state.map((el: IStore) => { 
				 el.mainStore.map((item: IItesmsStore) => {
					item.card.map((elem: ICardItems) => {
						if (elem.id === action.payload.id) {
							elem.title = action.payload.title
						} 
						return el
					})
				return el
			})
			return el
			})]
		default:
			return state
	}
}
export const addCard = (payload: { id: number, addCard: boolean }) => ({ type: reducerConstats.ACTIVE_CARD, payload })
export const changeTitleCard = (payload: { id: number, card: {id: string,	title: string	}, name:string}) => ({ type: reducerConstats.CHANGE_TITLE_CARD, payload })
export const changeName = (payload: { id: number, title: string, name:string}) => ({ type: reducerConstats.CHANGE_NAME_COLUMN, payload })
export const setNameUser = (payload: string) => ({ type: reducerConstats.SET_NEW_USER, payload })
export const deleteCard = (payload: string) => ({ type: reducerConstats.DELETE_CARD, payload })
export const editCard = (payload: {id:string, title:string}) => ({ type: reducerConstats.EDIT_CARD, payload })





