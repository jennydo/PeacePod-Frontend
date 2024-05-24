import {
  Box,
  GridItem,
  HStack,
  Text,
  Grid,
  Input,
  VStack,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import "./Prompt.css";
import { IoIosSend } from "react-icons/io";
import { Icon } from "@chakra-ui/react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import axios from "axios";

const Prompt = () => {
  const { user } = useAuthContext();

  const peacepodUserId = "661f3d5f7bc0dc0597752679";
  // const [prompt, setPrompt] = useState(() => {
  //   const currentPrompt = JSON.parse(localStorage.getItem("new-prompt"));

  //   if (currentPrompt) {
  //     /// New day, clear local storage prompt
  //     const currentDate = new Date().getDate();
  //     const promptDate = new Date(
  //       currentPrompt.updatedAt
  //         ? currentPrompt.updatedAt
  //         : currentPrompt.createdAt
  //     ).getDate();

  //     if (currentDate !== promptDate) return null;
  //     else return currentPrompt;
  //   } else return null;
  // });

  /// Check if we have to call api or not

  const checkNewDay = () => {
    /// Check if anything in the localStorage
    const currentPrompt = JSON.parse(localStorage.getItem("new-prompt"));

    if (currentPrompt) {
      const currentDate = new Date().getDate();
      const promptDate = new Date(
        currentPrompt.updatedAt
          ? currentPrompt.updatedAt
          : currentPrompt.createdAt
      ).getDate();

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
        { userId: peacepodUserId },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      console.log("Response from get prompt ", response.data);

      localStorage.setItem("new-prompt", JSON.stringify(response.data));

      setPrompt(response.data);
    } catch (err) {
      console.log("error while creating prompt ", err);
    }
  };

  const scheduleDailyPrompt = () => {
    const now = new Date();
    const tmr = new Date(now);

    // tmr.setTime(tmr.getTime() + 5 * 1000)
    tmr.setDate(now.getDate() + 1);
    tmr.setTime(0, 0, 0, 0);

    const timeUntilMidnight = tmr - now;

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

  const promptQuote = prompt ? prompt.content : "I love it when you";
  const promptResponses = [
    "love me too",
    "cook me dinner",
    "sing with me",
    "fix my resume for the 100th time",
    "care for me the tiniest",
    "take a walk together",
    "watch a movie",
    "have deep conversations",
    "go on a road trip",
    "try new recipes together",
    "explore new places",
    "give me surprises",
    "read books together",
    "help me with chores",
    "plan our future",
    "encourage me",
    "support my dreams",
    "comfort me when I'm sad",
    "make me laugh",
    "dance with me",
    "share our secrets",
    "celebrate my achievements",
    "learn new things together",
    "forgive my mistakes",
    "be patient with me",
    "listen to my thoughts",
    "appreciate my efforts",
    "be there for me always",
    "dream big with me",
    "enjoy the little moments",
    "cherish our memories",
    "trust me",
    "be my best friend",
    "respect my opinions",
    "show affection",
    "inspire me",
    "make me feel special",
    "surprise me with gifts",
    "give me hugs",
    "kiss me goodnight",
    "say 'I love you'",
    "make me breakfast in bed",
    "encourage my passions",
    "admire my strengths",
    "lift me up when I'm down",
    "be my rock",
    "grow together",
    "create beautiful memories",
    "be honest with me",
    "understand my feelings",
    "be my partner in crime",
    "support my decisions",
    "make me feel safe",
    "share our fears",
    "celebrate our love",
  ];

  const [firstPromptResponse, setFirstPromptResponse] = useState("");
  const [idx, setIdx] = useState(0);
  const [promptsDisplay, setPromptsDisplay] = useState([]);
  const [showFirstPrompt, setShowFirstPrompt] = useState(false);
  const firstPromptRef = useRef(null);
  const [input, setInput] = useState("");

  const handleClickPrompt = () => {
    if (idx >= promptResponses.length) return;
    setShowFirstPrompt(false);
    setTimeout(() => {
      if (promptResponses) {
        setPromptsDisplay((prevPromptsDisplay) => [
          firstPromptResponse,
          ...prevPromptsDisplay,
        ]);
      }
      setFirstPromptResponse(promptResponses[idx]);
      if (firstPromptRef.current) {
        firstPromptRef.current.focus();
      }
      setShowFirstPrompt(true);
    }, 500);
    setIdx(idx + 1);
  };

  return (
    <Box w="100%" h="100%">
      <VStack h="100%" alignItems="stretch">
        <HStack alignItems="flex-start">
          <Box w="40%" onClick={handleClickPrompt} textAlign="right">
            <Text>{promptQuote}</Text>
          </Box>
          <Box w="60%" overflowY="hidden" maxH="65vh">
            <Grid templateRows="repeat(5, 1fr)" gap={6} ref={firstPromptRef}>
              <GridItem
                onClick={handleClickPrompt}
                ref={firstPromptRef}
                className={
                  showFirstPrompt ? "fade-in-text show" : "fade-in-text"
                }
                tabIndex={-1}
              >
                {firstPromptResponse}
              </GridItem>
              {promptsDisplay &&
                promptsDisplay.map((promptRes, promptIdx) => (
                  <GridItem key={promptIdx} w="100%" h="10">
                    {promptRes}
                  </GridItem>
                ))}
            </Grid>
          </Box>
        </HStack>
        <Box>
          <InputGroup size="md">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`${promptQuote.slice(0, 30)}...`}
              size="md"
              // variant='unstyled'
              variant="flushed"
            />
            <InputRightElement width="4.5rem">
              <Button
                rightIcon={<Icon as={IoIosSend} />}
                h="1.75rem"
                size="sm"
                variant="ghost"
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </VStack>
    </Box>
  );
};

export default Prompt;
