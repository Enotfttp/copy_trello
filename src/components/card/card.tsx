import { FC } from 'react';
import { ICard } from '../../interfaces/trelloInterface';
import './card.scss';

const Card:FC<ICard> = (props:ICard)=> {
  
	return (
		<>
			<div className='card'>
				<p>{ props.title}</p>
			</div>
	  </>
  );
}

export default Card;
