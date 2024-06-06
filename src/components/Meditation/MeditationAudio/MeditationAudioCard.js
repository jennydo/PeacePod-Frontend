import React, { useContext } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { AudioContext } from "../../../context/AudioContext";
import { SpotifyContext } from "../../../context/SpotifyContext";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import axios from 'axios'

const AudioCard = ({ audio }) => {
  const { chosenAudio, dispatch } = useContext(AudioContext);
  const { dispatch: spotifyDispatch } = useContext(SpotifyContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const chooseAudio = () => {
    dispatch({
      type: "CHOOSE_AUDIO",
      payload: audio,
    });
    dispatch({ type: "CHOOSE_PLAY_AUDIO" })
    spotifyDispatch({ type: "UNCHOOSE_PLAY_SPOTIFY"})
  };

  const handleFavorite = async () => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: audio });

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/meditation/audios/${audio._id}`,
        {
          isFavorite: !audio.isFavorite
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    } catch (err) {
      console.log("Error while update is favorite of audio", err)
    }
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
        // bg="#BDE0FE"
        justifyContent="center"
        alignItems="center"
        borderRadius={10}
        sx={{
          _hover: {
            background: "#FFAFCC",
          },
          "&": {
            transition: "all 250ms linear",
          },
        }}
        onClick={chooseAudio}
        // borderColor={audio && chosenAudio && audio._id === chosenAudio._id ? "red.100" : "none"}
        // borderWidth={audio && chosenAudio && audio._id === chosenAudio._id ? 5 : 0}
        bg={audio && chosenAudio && audio._id === chosenAudio._id ? "#FFAFCC" : "#FFD6FF"}
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
