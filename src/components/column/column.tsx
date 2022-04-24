import { ChangeEvent, FC, useState } from 'react';
import Card from '../card/card';
import './column.scss';
import { useDispatch } from 'react-redux';
import { addCard, changeName, changeTitleCard } from '../../redux/reducer';
import { IColumn } from '../../interfaces/trelloInterface';
import { mainConstats } from '../../constants/constants';
import  { ICardItems } from '../../interfaces/reduxInterface';
import cross from '../../assets/cross.svg'
import { v4 as uuid } from 'uuid';

const Column: FC<IColumn> = (props:IColumn) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	
	const changeNameColumn = (event: ChangeEvent<HTMLTextAreaElement>, type: boolean) => { 
		if (props.id === Number(event.target.id)) {
			event.target.style.height = "auto"
			let scHeight = event.target.scrollHeight;
			event.target.style.height = `${scHeight}px`
		}
		if (type) {
			setTitle(event.target.value)
		} else { 
			dispatch(changeName({id:props.id,title:event.target.value}))
		}
	}

	const setTitleCard = (idCard: number) => { 
		dispatch(addCard({ id: idCard, addCard: true })) 
		if (title.trim() !== '') {
			dispatch(changeTitleCard({id: props.id, card: {	id: uuid(),	title:title }}	))
		}
	}
	
  return (
	  <>
		  <div className='column' id={String(props.id)}>
			  <textarea suppressContentEditableWarning={true} id={String(props.id)} contentEditable className='column-name' onChange={(event: ChangeEvent<HTMLTextAreaElement>) => { changeNameColumn(event, false) }} defaultValue={props.title}></textarea>
			  {props.card.map((el: ICardItems) => { 
					  return (
						  <Card
							  title={el.title}
							  key={el.id}
							  idCard={el.id}
							  idColumn={props.id}
							  name={props.name}
						  />
					  )
			  }) }
			  { props.addCard ? (
				  <button className='add-btn' onClick={() => { dispatch(addCard({ id: props.id, addCard: false } )) }}>{mainConstats.BTN_ADD_CARD}</button>
			  ) : (
					  <>
						  <textarea suppressContentEditableWarning={true} id={String(props.id)} className="title-card" onChange={(event: ChangeEvent<HTMLTextAreaElement>) => { changeNameColumn(event, true) }} placeholder={mainConstats.TITLE_CARD}></textarea>	
						  <div className="btn-block">
						 	 <button className='addCard-btn-add' onClick={()=>setTitleCard(props.id)}>{mainConstats.BTN_ADD_CARD}</button> 
							  <img className='addCard-btn-close' alt='cross-btn' src={cross} onClick={() => { dispatch(addCard({ id: props.id, addCard: true } ))}} />
						  </div>
					  </>
			  )}
		  </div>
	  </>
  );
}

export default Column;
