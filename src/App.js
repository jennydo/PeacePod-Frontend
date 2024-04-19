import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import NewsFeed from './pages/NewsFeed';
import Chat from './pages/Chat';
import Meditation from './pages/Meditation';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext()

  return (
    <ChakraProvider className="">
      <div className="">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/signup" element={(!user) ? <SignUpPage/> : <Navigate to="/"/>} />
            <Route path="/login" element={(!user) ? <LogInPage/> : <Navigate to="/"/>} />
            <Route path="/newsfeed" element={user ? <NewsFeed /> : <Navigate to="/login"/>} />
            <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login"/>} />
            <Route path="/meditation" element={user ? <Meditation /> : <Navigate to="/login"/>} />
            <Route path="/userprofile" element={user ? <UserProfile /> : <Navigate to="/login"/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
