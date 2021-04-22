import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/' exact component={home} />
        <Route path='/login' component={login} />
        <Route path='/signup' component={signup} />
      </Router>
    </div>
  )
}

export default App
