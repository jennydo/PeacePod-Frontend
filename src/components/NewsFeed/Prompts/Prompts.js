import { Box, GridItem, HStack, Text, Grid } from "@chakra-ui/react";
import { useState, useRef } from "react";
import './Prompts.css';


const Prompts = () => {
    const promptQuote = "I love it when you";
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
        "celebrate our love"
    ];
    
    const [firstPromptResponse, setFirstPromptResponse] = useState("")
    const [idx, setIdx] = useState(0);
    const [promptsDisplay, setPromptsDisplay] = useState([])
    const [showFirstPrompt, setShowFirstPrompt] = useState(false);
    const firstPromptRef = useRef(null);

    const handleClickPrompt = () => {
        if (idx >= promptResponses.length) return;
        setShowFirstPrompt(false);
        setTimeout(() => {
            if (promptResponses) { setPromptsDisplay(prevPromptsDisplay => [firstPromptResponse, ...prevPromptsDisplay]); }
            setFirstPromptResponse(promptResponses[idx]);
            if (firstPromptRef.current) {
                firstPromptRef.current.focus();
            }
            setShowFirstPrompt(true);
        }, 500);
        setIdx(idx+1);
    }

    return ( 
        <Box w="50%">
            <HStack alignItems="flex-start">
                <Box w="50%" onClick={handleClickPrompt} textAlign="right">
                    <Text>{promptQuote}</Text>
                </Box>
                <Box w="50%" overflowY="auto" maxHeight={500}>
                    <Grid templateRows='repeat(5, 1fr)' gap={6} ref={firstPromptRef} >
                        <GridItem 
                            onClick={handleClickPrompt}
                            ref={firstPromptRef} 
                            className={showFirstPrompt ? "fade-in-text show" : "fade-in-text"}
                            tabIndex={-1} > 
                            {firstPromptResponse}
                        </GridItem>
                        {promptsDisplay && promptsDisplay.map((promptRes, promptIdx) => (
                            <GridItem key={promptIdx} w='100%' h='10'>
                                {promptRes}
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            </HStack>
        </Box>
     );
}
 
export default Prompts;