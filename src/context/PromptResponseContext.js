import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const PromptResponsesContext = createContext();

export const promptResponsesReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROMPT_RESPONSES":
      return {
        promptResponses: action.payload,
      };
    case "CREATE_PROMPT_RESPONSE":
      return {
        promptResponses: [
            action.payload,
            ...state.promptResponses
        ],
        firstPromptResponse: action.payload,
      };
    case "UPDATE_FIRST_RESPONSE":
      return {
        ...state,
        firstPromptResponse: action.payload
      }
    case "CLEAR":
      return {
        promptResponses: [],
        firstPromptResponse: null,
      };
    default:
      return state;
  }
};

export const PromptResponsesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(promptResponsesReducer, {
    promptResponses: [],
    firstPromptResponse: null,
  });
  
  // const user = JSON.parse(localStorage.getItem("user"));

  // const fetchPromptResponses = async () => {
  //   const prompt = JSON.parse(localStorage.getItem("new-prompt"));
    

  //   if (!prompt || !user) return;

  //   try {
  //     const responses = await axios.get(
  //       `http://localhost:4000/api/promptResponses/prompt/${prompt._id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user?.token}`,
  //         },
  //       }
  //     );

  //     console.log("All responses for prompt", responses.data);
  //     dispatch({ type: "GET_PROMPT_RESPONSES", payload: responses.data });
  //   } catch (error) {
  //     console.log("Error while fetching prompt responses", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchPromptResponses()
  //   console.log("Refetch prompt responses")
  // }, [dispatch]);

  return (
    <PromptResponsesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PromptResponsesContext.Provider>
  );
};
