import React from "react";
import "./CuteDog.scss";
import {
  Tooltip,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { PromptResponsesContext } from "../../../context/PromptResponseContext";
import { useState, useContext } from "react";



const CuteDog = ({ openModal }) => {
  const { dispatch } = useContext(PromptResponsesContext);
  const [input, setInput] = useState("");
  const prompt = JSON.parse(localStorage.getItem("new-prompt"));
  const handleSendResponse = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!prompt) return;

    try {
      const response = await axios.post(
        `http://localhost:4000/api/promptResponses/${prompt._id}`,
        {
          content: input,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      // setShowFirstPrompt(false);
      setTimeout(() => {
        // if (firstPromptRef.current) {
        //   firstPromptRef.current.focus();
        // }
        // setShowFirstPrompt(true);
        setInput("");

        dispatch({ type: "CREATE_PROMPT_RESPONSE", payload: response.data });

        // setPromptsDisplay((prevPromptsDisplay) => [
        //   response.data,
        //   ...prevPromptsDisplay,
        // ]);
      }, 500);
      // setIdx(idx + 1);
    } catch (error) {
      console.log("Error while creating prompt response", error);
    }
  };

  return (
    <>
      <Tooltip label="Explore the daily prompt" bg="grey">
        <button class="btn-dog btn-like" onClick={openModal}>
          <div class="heart"></div>
        </button>
      </Tooltip>

      <Popover>
        <PopoverTrigger>
          <Box>
            <Tooltip label="Send message to the sky" bg="grey">
              <Button class="btn-dog btn-dislike">
                <Icon as={IoIosSend} boxSize={8} color="#a663cc" />
              </Button>
            </Tooltip>
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
          <Text>{`${prompt.content.slice(0, 300)}`}</Text>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                // placeholder={`${prompt.content.slice(0, 300)}`}
                size="lg"
                // variant="flushed"
              />
                <Button
                  rightIcon={<Icon as={IoIosSend} />}
                  h="1.75rem"
                  size="sm"
                  // variant="ghost"
                  onClick={handleSendResponse}
                  mt={3}
                  bgColor={"#f0d4ff"}
                >
                  Send
                </Button>
              
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <div class="wrapper">
        <div class="card-container">
          <div class="dog">
            <div class="head">
              <div class="ears"></div>
              <div class="face"></div>
              <div class="eyes">
                <div class="teardrop"></div>
              </div>
              <div class="nose"></div>
              <div class="mouth">
                <div class="tongue"></div>
              </div>
              <div class="chin"></div>
            </div>
            <div class="body">
              <div class="tail"></div>
              <div class="legs"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CuteDog;
