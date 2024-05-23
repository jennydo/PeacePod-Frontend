import { createContext, useReducer, useEffect } from "react";

export const AudioContext = createContext();

export const audioReducer = (state, action) => {
  switch (action.type) {
    case "GET_AUDIOS":
      return {
        ...state,
        audios: action.payload,
        favoriteAudios: action.payload.filter((audio, _) => audio.isFavorite )
      };
    case "CHOOSE_AUDIO":
      return {
        ...state,
        chosenAudio: action.payload,
      };
    case "ADD_AUDIO":
      return {
        ...state,
        audios: [action.payload, ...state.audios],
      };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        audios: state.audios.map((audio, _) => {
          if (audio === action.payload) audio.isFavorite = !audio.isFavorite
            return audio
        }),
        favoriteAudios: state.audios.filter((audio, _) => audio.isFavorite)
      }
    default:
      return state;
  }
};

export const AudioContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(audioReducer, {
    audios: [], /// list of all audios
    chosenAudio: null, /// currently chosen audio 
    favoriteAudios: [] /// list of favorite audios
  });

  useEffect(() => {
    /// TODO: fetch from DB
    dispatch({ type: "GET_AUDIOS", payload: [] });
  }, [dispatch]);

  return (
    <AudioContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};
