import { ChangeEvent, FC,  useState } from 'react';
import './startPopup.scss';
import {  useDispatch } from 'react-redux';
import { setNameUser } from '../../redux/reducer';


const StartPopup: FC = () => {
	
	const [name, setName] = useState('')
	const [cliclBtn, setClickBtn] = useState(false)
	const dispatch = useDispatch()


	const nameUser = (event: ChangeEvent<HTMLInputElement>) => { 
		setName(event.target.value.trim())
	}

	const clickBtn = () => {
		localStorage.setItem('name', name)
			dispatch(setNameUser(name))
			setClickBtn(true)
	}

  return (
	  <>
		  <div className={ cliclBtn ? "modal" : 'modal-active'}>
		 	 <div className='popup'>
				  <span>Введите ваше имя</span>
				  <input type="text" onChange={(event:ChangeEvent<HTMLInputElement>)=>nameUser(event) } />
				  <button disabled={name === '' ? true : false} onClick={()=> clickBtn()}>Продолжить</button>
		 	 </div>
		  </div>
	  </>
  );
}

export default StartPopup;
