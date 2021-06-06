import Compo from './components/Compo'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import SignOut from './components/SignOut'
import Error from './components/Error'
import Welcome from './components/Welcome'
import HireUser from './components/HireUser'
import ListTalent from './components/ListTalent'
import PostTalent from './components/PostTalent'
import ViewTalent from './components/ViewTalent'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = "/" component = {Compo} />
          <Route exact path = "/signup" component = {SignUp} />
          <Route exact path = "/profile" component = {Profile} />
          <Route exact path = "/profile/:username" component = {Profile} />
          <Route exact path = "/login" component = {SignIn} />
          <Route exact path = "/logout" component = {SignOut} />
          <Route exact path = "/postTalent/:category" component = {PostTalent} />
          <Route exact path = "/hireUser/:username" component = {HireUser} />
          <Route exact path = "/viewTalent/:category" component = {ViewTalent} />
          <Route exact path = "/listTalent/:code" component = {ListTalent} />
          <Route path="/confirm/:confirmationCode" component={Welcome} />
          <Route path = "*" component = {Error} />
        </Switch>
          
      </Router>
    </div>
  );
}

export default App;
