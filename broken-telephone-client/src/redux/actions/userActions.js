import axios from 'axios'
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  STOP_LOADING_UI,
  MARK_NOTIFICATIONS_READ,
} from '../types'

import firebase from 'firebase/app'
import 'firebase/auth'

export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOADING_UI })
  if (userData.token) {
    setAuthorizationHeader(userData.token)
    dispatch(getUserData())
    dispatch({ type: CLEAR_ERRORS })
  } else {
    axios
      .post('/login', userData)
      .then((res) => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData())
        dispatch({ type: CLEAR_ERRORS })
      })
      .catch((error) => {
        dispatch({
          type: SET_ERRORS,
          payload: error.response.data,
        })
      })
  }
}

export const signupUser = (newUserData) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      })
    })
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken')
  delete axios.defaults.headers.common['Authorization']
  firebase.auth().signOut()
  dispatch({ type: SET_UNAUTHENTICATED })
  dispatch({ type: STOP_LOADING_UI })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    })
    .catch((err) => console.log(err))
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', FBIdToken)
  axios.defaults.headers.common['Authorization'] = FBIdToken
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData())
    })
    .catch((err) => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData())
    })
    .catch((err) => console.log(err))
}

export const markNotificationsRead = (notifiactionIds) => (dispatch) => {
  axios
    .post('/notifications', notifiactionIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      })
    })
    .catch((err) => console.log(err))
}
