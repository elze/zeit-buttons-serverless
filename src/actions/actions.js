export const STATE_FROM_BACKEND = 'STATE_FROM_BACKEND'
export const TOGGLE_BUTTON = 'TOGGLE_BUTTON'

export function stateFromBackend(primarySkills, error) {    
  return { type: STATE_FROM_BACKEND, primary_skills: primarySkills, error: error }
}

export function toggleButton(ind) {    
  return { type: TOGGLE_BUTTON, index: ind}
}