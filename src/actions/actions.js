export const TOGGLE_BUTTON = 'TOGGLE_BUTTON'

//export function toggleButton(buttonText) {
export function toggleButton(showRes) {    
  return { type: TOGGLE_BUTTON, showRes}
}
