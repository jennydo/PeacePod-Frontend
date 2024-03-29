import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import NewsFeed from './pages/NewsFeed';
import Chat from './pages/Chat';
import Meditation from './pages/Meditation';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
          <div className="content">
            <Switch>
              <Route exact path = "/">
                <HomePage />
              </Route>
              <Route path = "/newsfeed">
                <NewsFeed />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route path="/meditation">
                <Meditation />
              </Route>
              <Route path="/userprofile">
                <UserProfile />
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
