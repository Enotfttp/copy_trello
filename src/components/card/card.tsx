import { ChangeEvent, FC, useState } from 'react';
import { ICard } from '../../interfaces/trelloInterface';
import './card.scss';
import cross from '../../assets/cross.svg'
import pencil from '../../assets/pencil.svg'
import { useDispatch } from 'react-redux';
import { deleteCard, editCard } from '../../redux/reducer';


const Card: FC<ICard> = (props: ICard) => {
	const [edit, setEdit] = useState(false)
	const [cardValue, setCardValue] = useState('');
	const dispatch = useDispatch();

	const deleteCardHandler = () => {
		dispatch(deleteCard(props.idCard))
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
	return (
		<>
			<div className='card'>
				<div className='block-textarea'>
					<textarea suppressContentEditableWarning={true} disabled={true} id={String(props.idCard)} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => { changeHeight(event) }} contentEditable className='card-name' defaultValue={props.title}></textarea>
					{edit ?
						(<button className='save-edit' id={String(props.idCard)} onClick={(event: any)=>saveEdit(event)} >Сохранить</button>)
						: (<></>)
					}
				</div>
				<div className='block-img'>
					<img src={pencil} alt="pencil" onClick={(event: any) => editCardHandler(event)} id={String(props.idCard) }/>
					<img src={cross} alt="cross" onClick={deleteCardHandler} />
				</div>
			</div>
	  </>
  );
}

export default Card;
