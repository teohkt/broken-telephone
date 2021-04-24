import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/broken-telephone.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
    dispatch(signupUser(newUserData, props.history))
  }

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
            error={errors.email}
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
            error={errors.password}
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
            error={errors.confirmPassword}
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
            error={errors.handle}
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
      </Grid>

      <Grid item sm />
    </Grid>
  )
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Signup)
