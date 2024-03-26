import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Feed from './Feed';
import Messages from './Messages';
import Meditation from './Meditation';
import Profile from './Profile';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
         <Navbar />
          <div className="content">
            <Switch>
              <Route exact path = "/">
                <Home />
              </Route>
              <Route path = "/feed">
                <Feed />
              </Route>
              <Route path="/messages">
                <Messages />
              </Route>
              <Route path="/meditation">
                <Meditation />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path = "*">
                <NotFound/>
             </Route>
           </Switch>
         </div>
       </div>
    </Router>
  );
}

export default App;
