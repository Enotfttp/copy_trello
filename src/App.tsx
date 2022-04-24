import './App.scss';
import {  useSelector } from 'react-redux';
import Column from './components/column/column';
import IStore, { IItesmsStore } from './interfaces/reduxInterface';
import StartPopup from './components/startPopup/startPopup';
import { useEffect } from 'react';


function App() {

	const state = useSelector((store: IStore) => store)
	useEffect(() => {
		localStorage.setItem('allArray', JSON.stringify(state))
	}, [state])

	return (
	  <>
		  <div className='app'>
			  <StartPopup />
			  {state.mainStore.map((el: IItesmsStore) => {
				  return (
					  <Column
						  key={el.id}
						  id={el.id}
						  title={el.title}
						  addCard={el.addCard}
						  card={el.card}
						  name={String(localStorage.getItem('name'))}
					  />
				  )					
			  })}
		  </div>
	  </>
  );
}

export default App;
