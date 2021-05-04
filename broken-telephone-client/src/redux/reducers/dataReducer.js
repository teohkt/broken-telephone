import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from '../types'

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
        let temp = state.scream.comments
        state.scream = action.payload
        state.scream.comments = temp
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
    case SUBMIT_COMMENT:
      let indexScream = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
      state.screams[indexScream].commentCount = Number(state.scream.commentCount) + 1

      return {
        ...state,
        scream: {
          ...state.scream,
          commentCount: Number(state.scream.commentCount) + 1,
          comments: [action.payload, ...state.scream.comments],
        },
      }
    default:
      return state
  }
}
