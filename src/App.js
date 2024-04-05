import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import NewsFeed from './pages/NewsFeed';
import Chat from './pages/Chat';
import Meditation from './pages/Meditation';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider className="">
      <div className="">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/newsfeed" element={<NewsFeed />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
