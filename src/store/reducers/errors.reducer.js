import { SET_ERROR_MESSAGE } from "../constants"

  const initialState = {
    errors: null
  }
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_ERROR_MESSAGE:
        return { ...state, errors: payload }
      default:
        return state
    }
  }
  