import { addStore, reducerConstats } from "../constants/constants"
import IStore, { IItesmsStore, ICardItems, IUser, ICardUser } from "../interfaces/reduxInterface"
import { v4 as uuid } from 'uuid';




const defaultStore: IStore = JSON.parse(String(localStorage.getItem('allArray'))) ? JSON.parse(String(localStorage.getItem('allArray'))) : addStore ;
//const defaultStore:IStore = {}
export const mainReducer = (state = defaultStore, action:any) => { 
	switch (action.type) {
		case reducerConstats.SET_NEW_USER:
			const currentState = {
				...state.mainStore.map((el: IItesmsStore) => {
					el.addCard = true
					return el
				 }), user: state.user.concat({
					id: uuid(),
					name: action.payload,
					idCard: []
				})
			}
			const used: any = {};
			const newArray = currentState.user.filter((item: IUser) => {
				return item.name in used ? 0 : (used[item.name] = 1);
			});
			return {
				user: newArray,
				mainStore:state.mainStore
			}
		case reducerConstats.ACTIVE_CARD:
			return {
				...state, mainStore: state.mainStore.map((el: IItesmsStore) => {
					if (action.payload.id === el.id) {
						el.addCard = action.payload.addCard
					} else if (!action.payload.addCard) {
						el.addCard = true
					}
					return el
				})
			}
		case reducerConstats.CHANGE_TITLE_CARD:
			return {
				...state, mainStore: state.mainStore.map((el: IItesmsStore) => { 
					if (action.payload.id === el.id) {
						el.card.push(action.payload.card)
						}
					return el
				}), user: state.user.map((el: IUser) => { 
					if (el.name === localStorage.getItem('name')) { 
						el.idCard = el.idCard.concat({
							idColumn: action.payload.id,
							idCard:action.payload.card.id
						})
					}
				
					return el
				})
			}
		case reducerConstats.CHANGE_NAME_COLUMN:
			return {
				...state, mainStore: state.mainStore.map((el: IItesmsStore) => {
					if (action.payload.id === el.id) {
						el.title = action.payload.title
					}
					return el
				})
			}	
		case reducerConstats.DELETE_CARD:
			return {
				...state, mainStore: state.mainStore.map((el: IItesmsStore) => {
					const nextItem = el.card.filter((elem: ICardItems) => {
						if (elem.id !== action.payload.idCard) {
							return true
						} else {
							return false
						}
					})
					return {
						card:nextItem,
						id: el.id,
						title: el.title,
						addCard: el.addCard
					}
				}), user: state.user.map((el: IUser) => { 
					el.idCard.filter((item: ICardUser) => {
						if (item.idColumn === action.payload.idColumn && item.idCard === action.payload.idCard) {
							return false
						} else { 
							return true
						}
					})
					return el
				})
	}
		case reducerConstats.EDIT_CARD:
			return {
				...state, mainStore: state.mainStore.map((el: IItesmsStore) => {
					el.card.map((item: ICardItems) => {
				if (item.id === action.payload.id) {
					item.title = action.payload.title
						}
						return item
					})
				return el
			}) }
		default:
			return state
	}
}
export const addCard = (payload: { id: number, addCard: boolean }) => ({ type: reducerConstats.ACTIVE_CARD, payload })
export const changeTitleCard = (payload: { id: number, card: {id: string,	title: string	}}) => ({ type: reducerConstats.CHANGE_TITLE_CARD, payload })
export const changeName = (payload: { id: number, title: string}) => ({ type: reducerConstats.CHANGE_NAME_COLUMN, payload })
export const setNameUser = (payload: string) => ({ type: reducerConstats.SET_NEW_USER, payload })
export const deleteCard = (payload: {idCard: string, idColumn:number}) => ({ type: reducerConstats.DELETE_CARD, payload })
export const editCard = (payload: {id:string, title:string}) => ({ type: reducerConstats.EDIT_CARD, payload })





