import React, { useEffect, useContext } from "react";
import { Text } from "@chakra-ui/react";
import AudioCard from "./MeditationAudioCard";
import { AudioContext } from "../../../context/AudioContext";

const AudioList = () => {
  /// Dummy data for testing UI, later fetch from DB
  const { audios, chosenAudio, dispatch } = useContext(AudioContext);

  return (
    <>
    {audios.length ? (
        audios.map((audio, idx) => {
          return (
            <AudioCard audio={audio} />
          );
        })
      ) : (
        <Text mt={3}>
          You currently have no saved voices. Try to create one.
        </Text>
      )
    }
    </>
  )
};

export default AudioList;
