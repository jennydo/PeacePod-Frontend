import axios from "axios";
import { createContext, useReducer, useEffect } from "react";

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
    default:
      return state;
  }
};

export const AudioContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(audioReducer, {
    audios: [], /// list of all audios
    chosenAudio: null, /// currently chosen audio
    favoriteAudios: [], /// list of favorite audios
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(async () => {
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

      // console.log("Response from all audios", response.data)

      dispatch({ type: "GET_AUDIOS", payload: response.data });
    } catch (error) {
      console.log("Error from getting all audios", error);
    }
  }, [dispatch]);

  return (
    <AudioContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};
