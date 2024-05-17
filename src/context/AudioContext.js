import { createContext, useReducer, useEffect } from "react";

export const AudioContext = createContext();

export const audioReducer = (state, action) => {
  switch (action.type) {
    case "GET_AUDIOS":
      return {
        ...state,
        audios: action.payload,
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
          if (audio === action.payload) audio.isFavorite = !audio.isFavorite;
          return audio;
        }),
      };
    default:
      return state;
  }
};

export const AudioContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(audioReducer, {
    audios: [],
    chosenAudio: null,
  });

  /// Dummy data
  const voices = [
    {
      title: "Heartbreak",
      isFavorite: false,
    },
    {
      title: "Happy day",
      isFavorite: true,
    },
  ];

  useEffect(() => {
    /// TODO: fetch from DB
    dispatch({ type: "GET_AUDIOS", payload: voices });
  }, [dispatch]);

  return (
    <AudioContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};
