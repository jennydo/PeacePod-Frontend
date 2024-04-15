import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { PostsContextProvider } from './context/PostsContext';
import { CommentsContextProvider } from './context/CommentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PostsContextProvider>
        <CommentsContextProvider>
            <App />
        </CommentsContextProvider>
    </PostsContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
