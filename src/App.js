import './App.scss';
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
  const { user } = useAuthContext();

  return (
    <ChakraProvider className="">
      <div className="">
        <Router>
          <Navbar />
          <Routes>
            <Route exact element={<HomePage />} path="/" />
            <Route element={(!user) ? <SignUpPage/> : <Navigate to="/"/>} path="/signup" />
            <Route element={(!user) ? <LogInPage/> : <Navigate to="/"/>} path="/login" />
            <Route element={user ? <NewsFeed /> : <Navigate to="/login"/>} path="/newsfeed" />
            <Route element={user ? <Chat /> : <Navigate to="/login"/>} path="/chat" />
            <Route element={user ? <Meditation /> : <Navigate to="/login"/>} path="/meditation" />
            <Route element={user ? <UserProfile /> : <Navigate to="/login"/>} path="/userprofile" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
