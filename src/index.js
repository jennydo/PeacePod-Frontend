import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthContextProvider } from "./context/AuthContext";
import { PostsContextProvider } from "./context/PostsContext";
import { CommentsContextProvider } from "./context/CommentsContext";
import { ChatsContextProvider } from "./context/ChatsContext";
import { SpotifyContextProvider } from "./context/SpotifyContext";
import { AvatarContextProvider } from "./context/AvatarContext";
import { AudioContextProvider } from "./context/AudioContext";
import { PromptResponsesContextProvider } from "./context/PromptResponseContext";
import { MessagesContextProvider } from "./context/MessagesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <AudioContextProvider>
      <AvatarContextProvider>
        <PromptResponsesContextProvider>
          <PostsContextProvider>
            <CommentsContextProvider>
              <ChatsContextProvider>
                <SpotifyContextProvider>
                  <MessagesContextProvider>
                    <App />
                  </MessagesContextProvider>
                </SpotifyContextProvider>
              </ChatsContextProvider>
            </CommentsContextProvider>
          </PostsContextProvider>
        </PromptResponsesContextProvider>
      </AvatarContextProvider>
    </AudioContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
