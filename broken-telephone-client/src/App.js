import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import customTheme from './util/theme'
import AuthRoute from './util/AuthRoute'

// Pages
import Home from './Screens/Home'
import Login from './Screens/Login'
import Signup from './Screens/Signup'
import User from './Screens/Users'

const theme = createMuiTheme(customTheme)

const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route path='/' exact component={Home} />
              <AuthRoute path='/login' component={Login} />
              <AuthRoute path='/signup' component={Signup} />
              <Route path='/users/:handle' exact component={User} />
              <Route path='/users/:handle/scream/:screamId' exact component={User} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
