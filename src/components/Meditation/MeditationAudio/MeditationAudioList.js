import React, { useContext, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import AudioCard from "./MeditationAudioCard";
import { AudioContext } from "../../../context/AudioContext";
import axios from 'axios'

const AudioList = ({ isFilter }) => {
  /// Dummy data for testing UI, later fetch from DB
  const { audios, favoriteAudios, dispatch } = useContext(AudioContext);

  const displayedAudios = isFilter? favoriteAudios : audios
  console.log(displayedAudios)

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAudios = async () => {
    /// TODO: fetch from DB
    try {
      const response = await axios.get(
        "http://localhost:4000/api/meditation/audios",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      console.log("Response from all audios", response.data);

      dispatch({ type: "GET_AUDIOS", payload: response.data });
    } catch (error) {
      console.log("Error from getting all audios", error);
    }
  };

  useEffect(() => {
    fetchAudios()
  }, [dispatch]);

  return (
    <Box overflowY={"auto"} h="100%">
      {displayedAudios.length ? (
        displayedAudios.map((audio, idx) => {
          return <AudioCard audio={audio} key={idx}/>;
        })
      ) : (
        <Text mt={3}>
          {`You currently have no ${isFilter? "favorite" : "saved"} voices. Try to create one.`}
        </Text>
      )}
    </Box>
  );
};

export default AudioList;
