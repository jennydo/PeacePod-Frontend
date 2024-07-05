import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import "./Prompt.scss";
import PromptBgImage from "./PromptBgImage";
import { useState, useRef, useEffect, useContext } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import axios from "axios";
import { PromptResponsesContext } from "../../../context/PromptResponseContext";
import CuteDog from "./CuteDog";

const PromptModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useAuthContext();

  const { firstPromptResponse, promptResponses, dispatch } = useContext(
    PromptResponsesContext
  );

  const checkNewDay = () => {
    /// Check if anything in the localStorage
    const currentPrompt = JSON.parse(localStorage.getItem("new-prompt"));

    if (currentPrompt) {
      const currentDate = new Date().getDate();
      const promptDate = new Date(currentPrompt.createdAt).getDate();

      console.log(currentDate, promptDate);

      if (currentDate !== promptDate) return true;
      else return false;
    } else return true;
  };

  const [prompt, setPrompt] = useState(
    JSON.parse(localStorage.getItem("new-prompt"))
  );

  /// axios to get prompt
  const getPrompt = async () => {
    if (!checkNewDay()) return;

    /// New day -> axios post to get a new prompt
    let response;
    try {
      response = await axios.post(
        "http://localhost:4000/api/posts/prompt/",
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      console.log("Response from get prompt ", response.data);

      localStorage.setItem("new-prompt", JSON.stringify(response.data));

      setPrompt(response.data);
      dispatch({ type: "CLEAR" });
    } catch (err) {
      console.log("error while creating prompt ", err);
    }
  };

  const scheduleDailyPrompt = () => {
    const now = new Date();
    const tmr = new Date(now);

    // tmr.setTime(tmr.getTime() + 5 * 1000)
    tmr.setDate(now.getDate() + 1);
    tmr.setHours(0);
    tmr.setMinutes(0);

    const timeUntilMidnight = tmr - now;

    console.log(timeUntilMidnight, now, tmr);

    setTimeout(() => {
      /// This is to update the current prompt
      getPrompt();

      /// This is to schedule the next time to get prompt
      scheduleDailyPrompt();
    }, timeUntilMidnight);
  };

  useEffect(() => {
    /// Get first prompt if no prompt yet
    getPrompt();

    /// Schedule new prompt
    scheduleDailyPrompt();
  }, []);

  const fetchPromptResponses = async () => {
    const prompt = JSON.parse(localStorage.getItem("new-prompt"));

    if (!prompt || !user) return;

    try {
      const responses = await axios.get(
        `http://localhost:4000/api/promptResponses/prompt/${prompt._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      console.log("All responses for prompt", responses.data);
      dispatch({ type: "GET_PROMPT_RESPONSES", payload: responses.data });
    } catch (error) {
      console.log("Error while fetching prompt responses", error);
    }
  };
  useEffect(() => {
    fetchPromptResponses();
    console.log("Refetch prompt responses");
  }, [isOpen, dispatch, prompt]);

  const handleClose = () => {
    setIdx(0);
    dispatch({ type: "CLEAR" });
    setPromptsDisplay([]);
  };

  const promptQuote = prompt ? prompt.content : "I love it when you";
  const [firstResponse, setFirstResponse] = useState(null);
  const [idx, setIdx] = useState(0);
  const [promptsDisplay, setPromptsDisplay] = useState([]);
  const [showFirstPrompt, setShowFirstPrompt] = useState(true);
  const firstPromptRef = useRef(null);

  const handleClickPrompt = () => {
    if (idx >= promptResponses.length) return;
    setShowFirstPrompt(false);
    setTimeout(() => {
      setPromptsDisplay((prevPromptsDisplay) => [
        promptResponses[idx],
        ...prevPromptsDisplay,
      ]);
      setFirstResponse(promptResponses[idx]);
      dispatch({
        type: "UPDATE_FIRST_RESPONSE",
        payload: promptResponses[idx],
      });
      if (firstPromptRef.current) {
        firstPromptRef.current.focus();
      }
      setShowFirstPrompt(true);
    }, 500);
    setIdx(idx + 1);
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <CuteDog openModal={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={handleClose} />

          <ModalBody className="prompt-modal-body">
            <PromptBgImage />
            <Grid
              gridTemplateRows={"1fr"}
              h="100%"
              w="100%"
              mt={10}
              // zIndex={1}
              position="relative"
            >
              <GridItem h="60vh" w="100%">
                <Grid gridTemplateColumns={"1fr 50%"} h="100%" w="100%">
                  <GridItem
                    h="100%"
                    w="100%"
                    textAlign="right"
                    onClick={handleClickPrompt}
                  >
                    <p className="prompt-text quote">
                      {promptQuote.slice(0, promptQuote?.length - 3)}
                    </p>
                  </GridItem>
                  <GridItem
                    h="65vh"
                    w="100%"
                    overflowY="hidden"
                    textAlign="left"
                  >
                    <Grid
                      templateRows="repeat(5, 1fr)"
                      gap={6}
                      ref={firstPromptRef}
                    >
                      <GridItem
                        ref={firstPromptRef}
                        className={
                          showFirstPrompt ? "fade-in-text show" : "fade-in-text"
                        }
                        tabIndex={-1}
                      >
                        <p className="prompt-text responses">
                          {firstPromptResponse?.content}
                        </p>
                      </GridItem>
                      {promptsDisplay &&
                        promptsDisplay.map((promptRes, promptIdx) =>
                          promptIdx ? (
                            <GridItem key={promptIdx} w="100%" h="10">
                              <p className="prompt-text responses">
                                {promptRes.content}
                              </p>
                            </GridItem>
                          ) : undefined
                        )}
                    </Grid>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PromptModal;
