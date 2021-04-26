import { SET_SCREAMS, SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM } from '../types'

const initialState = {
  screams: [],
  scream: {},
  loading: false,
}

export default function foo(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      }
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
      state.screams[index] = action.payload
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload
      }
      return {
        ...state,
      }
    case DELETE_SCREAM:
      let indexDelete = state.screams.findIndex((scream) => scream.screamId === action.payload)
      let mutatedScreams = state.screams.slice()
      mutatedScreams.splice(indexDelete, 1)
      return {
        ...state,
        screams: [...mutatedScreams],
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      }
    default:
      return state
  }
}
