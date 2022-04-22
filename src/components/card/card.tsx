import { FC } from 'react';
import { ICard } from '../../interfaces/trelloInterface';
import './card.scss';
import cross from '../../assets/cross.svg'
import pencil from '../../assets/pencil.svg'
import { useDispatch } from 'react-redux';
import { deleteCard } from '../../redux/reducer';


const Card: FC<ICard> = (props: ICard) => {

	const dispatch = useDispatch();

	const deleteCardHandler = () => {
		dispatch(deleteCard(props.idCard))
	}
	const editCardHandler = () => { 

	}
  
	return (
		<>
			<div className='card'>
				<p>{props.title}</p>
				<div className='block-img'>
					<img src={pencil} alt="pencil" onClick={editCardHandler} />
					<img src={cross} alt="cross" onClick={deleteCardHandler} />
				</div>
			</div>
	  </>
  );
}

export default Card;
