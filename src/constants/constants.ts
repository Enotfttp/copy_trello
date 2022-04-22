export const mainConstats = {
	BTN_ADD_CARD: "+ Добавить карточку",
	TITLE_CARD: "Ввести заголовок для этой карточки",
}
export const reducerConstats = {
	ACTIVE_CARD: "ACTIVE_CARD",
	CHANGE_TITLE_CARD: "CHANGE_TITLE_CARD",
	CHANGE_NAME_COLUMN: "CHANGE_NAME_COLUMN",
	SET_NEW_USER: 'SET_NEW_USER',
	ENTER_USER: 'ENTER_USER',
	DELETE_CARD: 'DELETE_CARD',
	EDIT_CARD: 'EDIT_CARD'
}
export const addStore = {
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