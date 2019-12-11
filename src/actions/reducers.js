import {
	STATE_FROM_BACKEND,
	TOGGLE_BUTTON
} from './actions'

//import { initialState } from './initState'


const reducer = (state = {}, action) => {	
	console.log("We are at the beginning of reducer");
    switch (action.type) {
      case STATE_FROM_BACKEND:
		console.log(`reducer case STATE_FROM_BACKEND: state = ${JSON.stringify(state)}`);
         
		let stFromBackend = Object.assign({}, {primary_skills: action.primary_skills});
		console.log(`reducer case STATE_FROM_BACKEND: stFromBackend = ${JSON.stringify(stFromBackend)}`);
			
		return stFromBackend;
		
      case TOGGLE_BUTTON:
		console.log(`reducer case TOGGLE_BUTTON: state = ${JSON.stringify(state)}`);
		let newPrimarySkill = Object.assign({}, state.primary_skills[action.index], {showResult: !state.primary_skills[action.index].showResult});
		let newPS = Object.assign([...state.primary_skills], {[action.index]: newPrimarySkill});
         
		let newState = Object.assign({}, {primary_skills: newPS} );
		console.log(`reducer case TOGGLE_BUTTON: newState = ${JSON.stringify(newState)}`);
			
		return newState;		
      default:
        return state
    }
}

export default reducer
  