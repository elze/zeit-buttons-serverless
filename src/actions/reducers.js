import {
	TOGGLE_BUTTON,
	toggleButton
} from './actions'

const initialState = {
    showResult: false
}

function toggleShowHide(showRes) {
    if (showRes)
        showRes = false;
    else
        showRes = true;
    return showRes;
}

function buttonApp(state = initialState, action) {
    switch (action.type) {
      case TOGGLE_BUTTON:
        var newVisibility = toggleShowHide(action.showRes);
        return Object.assign({}, state, {
            showResult: newVisibility
        })
      default:
        return state
    }
}

export default buttonApp

  