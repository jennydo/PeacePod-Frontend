import React, { useContext, useState } from "react";
import { Text, Button, Box } from "@chakra-ui/react";
import AudioCard from "./MeditationAudioCard";
import { AudioContext } from "../../../context/AudioContext";

const AudioList = ({ isFilter }) => {
  /// Dummy data for testing UI, later fetch from DB
  const { audios, favoriteAudios } = useContext(AudioContext);

  const displayedAudios = isFilter? favoriteAudios : audios
  console.log(displayedAudios)

  return (
    <Box overflowY={"auto"} h="100%">
      {displayedAudios.length ? (
        displayedAudios.map((audio, idx) => {
          return <AudioCard audio={audio} />;
        })
      ) : (
        <Text mt={3}>
          You currently have no saved voices. Try to create one.
        </Text>
      )}
    </Box>
  );
};

export default AudioList;
