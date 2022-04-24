import { ChangeEvent, FC, useState } from 'react';
import { ICard } from '../../interfaces/trelloInterface';
import './card.scss';
import cross from '../../assets/cross.svg'
import pencil from '../../assets/pencil.svg'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, editCard } from '../../redux/reducer';
import IStore, { ICardUser, IUser } from '../../interfaces/reduxInterface';
import DescriptionWindow from '../descriptionWindow/descriptionWindow';


const Card: FC<ICard> = (props: ICard) => {
	const [edit, setEdit] = useState(false)
	const [cardValue, setCardValue] = useState('');
	const [descriptionWindow, setDescriptionWindow] = useState(false)
	const dispatch = useDispatch();
	const state = useSelector((store:IStore)=>store)

	const deleteCardHandler = () => {
		dispatch(deleteCard({ idCard:props.idCard, idColumn: props.idColumn }))
	}
	const editCardHandler = (event: any) => { 
		const id = event.target.id
		const textArea: any = document.getElementById(id)
		textArea.classList.add('active')
		textArea.disabled = false
		setEdit(true)
		
	}
	const changeHeight = (event: ChangeEvent<HTMLTextAreaElement>) => { 
		if (props.idCard === event.target.id	) {
			event.target.style.height = "auto"
			let scHeight = event.target.scrollHeight;
			event.target.style.height = `${scHeight}px`
			setCardValue(event.target.value)
		}
	}
	const saveEdit = (event: any) => { 
		const id = event.target.id	
		const textArea: any = document.getElementById(id)
		textArea.classList.remove('active')
		textArea.disabled = true
		setEdit(false)
		dispatch(editCard({id:id, title: cardValue}))
	}
	const openWindow = (event: any) => {
		if ((event.target.tagName !== 'BUTTON' && (event.target.tagName === 'TEXTAREA' && !edit)) || event.target.tagName === 'SPAN') { 
			setDescriptionWindow(true)
		}
	}
	const closeWindow = () => { 
		setDescriptionWindow(false)
	}

	return (
		<>
			<div className='card' key={props.idCard} >
				<div className='block-textarea' onClick={(event:any)=>openWindow(event)}>
					{state.user.map((el: IUser) => { 
						return(el.idCard.map((item: ICardUser) => { 
							if (item.idColumn === props.idColumn && item.idCard === props.idCard ) {
								return (<span key={el.id}>Author: {el.name }</span>)
							} else { 
								return null
							}
						})
						)
					})}
					<textarea suppressContentEditableWarning={true} disabled={true} id={String(props.idCard)} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => { changeHeight(event) }} contentEditable className='card-name' defaultValue={props.title}></textarea>
					{edit ?
						(<button className='save-edit' id={String(props.idCard)} onClick={(event: any)=>saveEdit(event)} >Сохранить</button>)
						: (<></>)
					}
				</div>
				{state.user.map((el: IUser)  => { 
						return(el.idCard.map((item: ICardUser) => { 
							if (item.idColumn === props.idColumn && item.idCard === props.idCard && el.name === props.name ) {
								return (	<div className='block-img' key={el.id}>
								<img src={pencil} alt="pencil" onClick={(event: any) => editCardHandler(event)} id={String(props.idCard) }/>
								<img src={cross} alt="cross" onClick={deleteCardHandler} />
							</div>)
							} else { 
								return null
							}
						})
						)
				})}
			</div>
			{descriptionWindow ? <DescriptionWindow closeWindow={closeWindow} name={props.name} idColumn={props.idColumn} idCard={props.idCard} title={props.title} /> : null}
	  </>
  );
}

export default Card;
