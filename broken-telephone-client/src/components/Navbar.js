import React from 'react'
import { Link } from 'react-router-dom' //Cant cherry pick, will throw error
//Material UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

const Navbar = () => {
  return (
    <AppBar>
      <Container>
        <Toolbar className='nav-container'>
          <Button color='inherit' component={Link} to={'/login'}>
            Login
          </Button>
          <Button color='inherit' component={Link} to={'/home'}>
            Home
          </Button>
          <Button color='inherit' component={Link} to={'/signup'}>
            Signup
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
