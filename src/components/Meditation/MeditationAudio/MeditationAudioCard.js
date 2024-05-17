import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { AudioContext } from "../../../context/AudioContext";

const AudioCard = ({ audio }) => {

    const { audios, chosenAudio, dispatch } = useContext(AudioContext)

    const chooseAudio = () => {
        dispatch({
            type: 'CHOOSE_AUDIO',
            payload: audio
        })
    }

    console.log("Chosen audio",chosenAudio, audio, chosenAudio === audio)

  return (
    <Flex
      w="100%"
      h={10}
      bg="green.100"
      marginBottom={3}
      marginTop={3}
      justifyContent="center"
      alignItems="center"
      borderRadius={10}
      sx={{
        ":hover": {
          background: "blue.100",
        },
        "&": {
          transition: "all 250ms linear",
        },
      }}
      onClick={chooseAudio}
      borderColor={audio === chosenAudio? 'red.200' : 'none'}
      borderWidth={2}
    >
      {audio.title}
    </Flex>
  );
};

export default AudioCard;
