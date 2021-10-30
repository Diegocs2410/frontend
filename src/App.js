import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Actions } from './components/Actions';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Notes } from './components/Notes';
import { Register } from './components/Register';
import { useUser } from './context/UserContext';
function App() {
  const { user } = useUser();
  const PrivateRoute = (props) => {
    return user.login ? <Route {...props} /> : <Redirect to='/' />;
  };
  const PublicRoute = (props) => {
    return user.login ? <Redirect to='/notes' /> : <Route {...props} />;
  };
  return (
    <Router>
      <Navbar />
      <Switch>
        <PrivateRoute path='/notes' component={Notes} />
        <PublicRoute path='/register' component={Register} />
        <PrivateRoute path='/actions/:idnote?' component={Actions} />
        <PublicRoute path='/' exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
