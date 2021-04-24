import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/broken-telephone.png'
import { Link } from 'react-router-dom'

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = (theme) => ({ ...theme.spreadThis })

const Login = (props) => {
  const { classes } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const stateUI = useSelector((state) => state.UI)
  const { loading, errors } = stateUI

  const user = useSelector((state) => state.user.authenticated)

  const submitHandler = (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      password: password,
    }
    dispatch(loginUser(userData))
  }

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

  useEffect(() => {
    if (user) {
      props.history.push(redirect)
    }
  }, [props.history, user, redirect])

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='Can and string logo' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={errors.email || false}
            error={errors.email || false}
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
            helperText={errors.password || false}
            error={errors.password || false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general || false}
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
            Don't have an account? <Link to={'/signup'}>Sign up here</Link>
          </small>
        </form>
      </Grid>

      <Grid item sm />
    </Grid>
  )
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)
