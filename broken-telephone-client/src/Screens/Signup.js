import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/broken-telephone.png'
import { Link } from 'react-router-dom'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

const styles = (theme) => ({ ...theme.spreadThis })

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID],
}

const Signup = (props) => {
  const { classes } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [handle, setHandle] = useState('')

  const dispatch = useDispatch()

  const stateUI = useSelector((state) => state.UI)
  const { loading, errors } = stateUI
  const user = useSelector((state) => state.user.authenticated)

  const submitHandler = (e) => {
    e.preventDefault()
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    }
    dispatch(signupUser(newUserData))
  }

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

  useEffect(() => {
    if (user) {
      props.history.push(redirect)
    }

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (firebase.auth().currentUser) {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token) => {
            const newUserDataViaAuth = {
              email: firebase.auth().currentUser.email,
              photoURL: firebase.auth().currentUser.photoURL,
              token: token,
              uid: firebase.auth().currentUser.uid,
              handle: firebase.auth().currentUser.uid,
            }
            dispatch(signupUser(newUserDataViaAuth))
          })
      }
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [props.history, user, redirect, dispatch])

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='Can and string logo' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={errors.email}
            error={!!errors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={errors.password}
            error={!!errors.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id='handle'
            name='handle'
            type='handle'
            label='Handle'
            className={classes.textField}
            helperText={errors.handle}
            error={!!errors.handle}
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={loading}
            className={classes.button}
            fullWidth
          >
            Submit
            {loading && <CircularProgress className={classes.progress} size={20} thickness={10} />}
          </Button>
          <small>
            Already have an account? <Link to={'/login'}>Login here</Link>
          </small>
        </form>

        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </Grid>

      <Grid item sm />
    </Grid>
  )
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Signup)
