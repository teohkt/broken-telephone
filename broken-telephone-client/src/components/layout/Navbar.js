import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

//Components
import MyButton from '../../util/MyButton'
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'

//Material UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

//Icons
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

//Actions
import { logoutUser } from '../../redux/actions/userActions'

const styles = (theme) => ({
  title: {
    flexGrow: 1,
  },
})

const Navbar = (props) => {
  const { classes } = props
  const { authenticated } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <AppBar>
      <Container>
        <Toolbar className='nav-container'>
          <Typography variant='h6' component={Link} to={'/'} className={classes.title}>
            Broken Telephone
          </Typography>
          {authenticated ? (
            <>
              <PostScream />
              <Notifications />
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>
              <MyButton tip='Logout' onClick={handleLogout} className=''>
                <ExitToAppIcon color='primary' />
              </MyButton>
            </>
          ) : (
            <>
              <Button color='inherit' component={Link} to={'/login'}>
                Login
              </Button>
              <Button color='inherit' component={Link} to={'/signup'}>
                Signup
              </Button>
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

// Navbar.propTypes = {
//   authenticated: PropTypes.bool.isRequired,
// }

export default withStyles(styles)(Navbar)
