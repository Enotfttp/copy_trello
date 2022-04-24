import { FC } from 'react';
import './descriptionWindow.scss';
import cross from '../../assets/cross.svg'
import { IDescriptionWindow } from '../../interfaces/trelloInterface';

const DescriptionWindow:FC<IDescriptionWindow>= (props:IDescriptionWindow)=> {
  
	return (
		<>
			<div className="description">
				<div className='description-popup'>
					<div className='block-header'>
						<span>Название карточки</span>
						<img src={cross} alt="cross" className='cross' onClick={()=>props.closeWindow()}/>
					</div>
					<div className='block-description'>
						<textarea placeholder='Добавить более подробное описание...' className='textarea-description'></textarea>
					</div>
					<div className='block-message'>
						<p className='comment'>Действия</p>
						<input type="text" placeholder='Напишите комментарий' className='message' />
					</div>
				</div>
			</div>
	  </>
  );
}

export default DescriptionWindow;
