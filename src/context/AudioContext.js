import { createContext, useReducer, useEffect } from "react";
import axios from 'axios';

export const AudioContext = createContext();

export const audioReducer = (state, action) => {
  switch (action.type) {
    case "GET_AUDIOS":
      return {
        ...state,
        audios: action.payload,
        favoriteAudios: action.payload.filter((audio, _) => audio.isFavorite),
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
        chosenAudio: action.payload
      };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        audios: state.audios.map((audio, _) => {
          if (audio === action.payload) audio.isFavorite = !audio.isFavorite;
          return audio;
        }),
        favoriteAudios: state.audios.filter((audio, _) => audio.isFavorite),
      };
    case "CLEAR":
      return { 
        audios: [],
        chosenAudio: null,
        favoriteAudios: [],
        isPlayingAudio: true
      };
    case "CHOOSE_PLAY_AUDIO":
      return {
        ...state,
        isPlayingAudio: true 
      };
    case "UNCHOOSE_PLAY_AUDIO":
      return {
        ...state,
        isPlayingAudio: false
      };
    default:
      return state;
  }
};

export const AudioContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(audioReducer, {
    audios: [], /// list of all audios
    chosenAudio: null, /// currently chosen audio
    favoriteAudios: [], /// list of favorite audios
    isPlayingAudio: true
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAudios = async () => {
    /// TODO: fetch from DB
    try {
      const response = await axios.get(
        "http://localhost:4000/api/meditation/audios",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      console.log("Response from all audios", response.data);

      dispatch({ type: "GET_AUDIOS", payload: response.data });
    } catch (error) {
      console.log("Error from getting all audios", error);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  return (
    <AudioContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};
