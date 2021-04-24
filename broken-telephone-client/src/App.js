import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'

// Components
import Navbar from './components/Navbar'
import themeObject from './util/theme'
import AuthRoute from './util/AuthRoute'

// Pages
import Home from './Screens/Home'
import Login from './Screens/Login'
import Signup from './Screens/Signup'

const theme = createMuiTheme(themeObject)

let authenticated
const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
    console.log(authenticated)
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Home} />
            <AuthRoute path='/login' component={Login} authenticated={authenticated} />
            <AuthRoute path='/signup' component={Signup} authenticated={authenticated} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  )
}

export default App
