import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
// Components
import Navbar from './components/Navbar'
import themeObject from './util/theme'
// Pages
import Home from './Screens/Home'
import Login from './Screens/Login'
import Signup from './Screens/Signup'

const theme = createMuiTheme(themeObject)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  )
}

export default App
