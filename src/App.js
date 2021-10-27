import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Notes } from './components/Notes';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/notes' component={Notes} />
      </Switch>
    </Router>
  );
}

export default App;
