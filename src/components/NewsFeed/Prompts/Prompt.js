import { Input, InputRightElement, Button, InputGroup } from "@chakra-ui/react";
import { useState, useContext } from "react";
import "./Prompt.scss";
import { IoIosSend } from "react-icons/io";
import { Icon } from "@chakra-ui/react";
import axios from "axios";
import { PromptResponsesContext } from "../../../context/PromptResponseContext";
import PromptModal from "./PromptModal";

const Prompt = () => {
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
      <PromptModal />
      {/* <InputGroup size="md" w="54%" mt={3}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`${prompt.content.slice(0, 300)}`}
          size="lg"
          variant="flushed"
        />
        <InputRightElement width="4.5rem">
          <Button
            rightIcon={<Icon as={IoIosSend} />}
            h="1.75rem"
            size="sm"
            variant="ghost"
            onClick={handleSendResponse}
          >
            Send
          </Button>
        </InputRightElement>
      </InputGroup> */}
    </>
  );
};

export default Prompt;
