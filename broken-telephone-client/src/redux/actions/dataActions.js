import axios from 'axios'

import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
} from '../types'

//Get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/screams')
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data })
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      })
    })
}
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch((err) => console.log(err))
}

// Like Scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      })
    })
    .catch((err) => console.log(err))
}

// Unlike Scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      })
    })
    .catch((err) => console.log(err))
}
