import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

//Components
import MyButton from '../util/MyButton'

//Material UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

//Icons
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'

const Navbar = () => {
  const { authenticated } = useSelector((state) => state.user)
  return (
    <AppBar>
      <Container>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <>
              <MyButton tip='Create a Scream!'>
                <AddIcon />
              </MyButton>

              <MyButton tip='Notifications'>
                <NotificationsIcon />
              </MyButton>
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>
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

export default Navbar
