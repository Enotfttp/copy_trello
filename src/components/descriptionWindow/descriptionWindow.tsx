import { FC } from 'react';
import './descriptionWindow.scss';
import cross from '../../assets/cross.svg'
import { IDescriptionWindow } from '../../interfaces/trelloInterface';
import IStore, { ICardUser,  IUser } from '../../interfaces/reduxInterface';
import { useSelector } from 'react-redux';

const DescriptionWindow: FC<IDescriptionWindow> = (props: IDescriptionWindow) => {
	
	const state = useSelector((store: IStore) => store)
		
  
	return (
		<>
			<div className="description">
			<div className='description-popup'>
					<div className='block-header' >
						<span>{ props.title}</span>
						<img src={cross} alt="cross" className='cross' onClick={() => props.closeWindow()} />
					</div>
					{state.user.map((el: IUser) => { 
						return el.idCard.map((item:ICardUser) => { 
							if (item.idColumn === props.idColumn && item.idCard === props.idCard) {
								return (
									<div className='block-description' key={ el.id}>
										<textarea placeholder={el.name === props.name ? 'Добавить более подробное описание...' : ''} className='textarea-description' disabled={el.name === props.name ? false : true} ></textarea>
									</div>
								)
							} else { 
								return null
							}
						})
					})}
					<div className='block-message' > 
						<p className='comment'>Действия</p>
						<input type="text" placeholder='Напишите комментарий' className='message' />
					</div>
				</div>
			</div>
	  </>
  );
}

export default DescriptionWindow;
