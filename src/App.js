import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ButtonCards } from "./components/Footer/Footer"
import NewsFeed from "./pages/NewsFeed"
import Chat from "./pages/Chat";
import Meditation from "./pages/Meditation";

function App() {
  return (
    <Router>
      <div className='App'>
        <ButtonCards />
        <Routes>
          <Route path="/new-feed" element={<NewsFeed />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/meditation" element={<Meditation />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
