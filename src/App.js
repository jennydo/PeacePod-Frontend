import './App.css';
import Home from './components/Home/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ButtonCards } from "./components/Home/Footer"
import NewsFeed from "./pages/NewsFeed"
import Chat from "./pages/Chat";
import Meditation from "./pages/Meditation";

function App() {
  return (
    <div className="App">
      <Home />
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router>
        <ButtonCards />
        <Routes>
          <Route path="/new-feed" element={<NewsFeed />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/meditation" element={<Meditation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
