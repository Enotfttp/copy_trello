import './App.scss';
import {  useSelector } from 'react-redux';
import Column from './components/column/column';
import IStore, { IItesmsStore } from './interfaces/reduxInterface';
import StartPopup from './components/startPopup/startPopup';
import { useEffect } from 'react';


function App() {

const state = useSelector((store: IStore[]) => store)
	useEffect(() => { 
		localStorage.setItem('allArray', JSON.stringify(state))
	}, [state])	
	console.log('state = ',state);
	
	
  return (
	  <>
		  <div className='app'>
				<StartPopup />
			  {state.map((el: IStore) => {
				  if (el.userName === localStorage.getItem('name')) { 
					return el.mainStore.map((item: IItesmsStore) => { 
						return (
							<Column
								id={item.id}
								title={item.title}
								key={item.id}
								addCard={item.addCard}
								card={item.card}
								name={el.userName}
							/>
						)
					  })
				  }
				  return null
			 })}
		  </div>
	  </>
  );
}

export default App;
