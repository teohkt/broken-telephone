import React, { useState } from 'react'
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

const styles = (theme) => ({ ...theme.spreadThis })

const Login = (props) => {
  const { classes } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const submitLogin = async (userData) => {
    setLoading(true)
    setErrors(null)
    setErrors({})
    try {
      const { data } = await axios.post(`/login`, userData)
      setLoading(false)
      console.log(data)
      localStorage.setItem('FBIdToken', `Bearer ${data.token}`)
      props.history.push('/')
    } catch (err) {
      setErrors(err.response.data)
      setLoading(false)
      console.log(errors)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      password: password,
    }
    submitLogin(userData)
  }

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
            helperText={errors.email}
            error={errors.email ? true : false}
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
            error={errors.password ? true : false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
