import React, { useContext, useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { AudioContext } from "../../../context/AudioContext";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const AudioCard = ({ audio }) => {
  const { chosenAudio, dispatch } = useContext(AudioContext);

  const chooseAudio = () => {
    dispatch({
      type: "CHOOSE_AUDIO",
      payload: audio,
    });
  };

  const handleFavorite = () => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: audio });
  };
  // console.log("Chosen audio", chosenAudio, audio, chosenAudio === audio);

  return (
    <Flex
      w="100%"
      h={12}
      marginBottom={3}
      marginTop={3}
      justifyContent={"space-between"}
    >
      <Flex
        w="100%"
        bg="yellow.100"
        justifyContent="center"
        alignItems="center"
        borderRadius={10}
        sx={{
          _hover: {
            background: "blue.100",
          },
          "&": {
            transition: "all 250ms linear",
          },
        }}
        onClick={chooseAudio}
        borderColor={audio._id === chosenAudio._id ? "red.100" : "none"}
        borderWidth={audio._id === chosenAudio._id ? 3 : 0}
      >
        {audio.title}
      </Flex>
      <IconButton
        variant="ghost"
        icon={
          audio.isFavorite ? (
            <FaHeart size={20} fill="#FFAFCC" />
          ) : (
            <FaRegHeart size={20} />
          )
        }
        onClick={handleFavorite}
        h={12}
        sx={{
          _hover: {
            background: "none",
          },
        }}
      />
    </Flex>
  );
};

export default AudioCard;
