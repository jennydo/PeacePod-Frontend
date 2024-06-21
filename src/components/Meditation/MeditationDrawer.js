import React, { useState, useContext, useEffect } from "react";
import {
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import BackgroundMain from "./Background/BackgroundMain";
import axios from "axios";
import { CloudinaryContext } from "../../context/CloudinaryContext";
import { SpotifyContext } from "../../context/SpotifyContext";
import { AudioContext } from "../../context/AudioContext";

const MeditationDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = JSON.parse(localStorage.getItem("user"));

  /// Get chosen image from cloudinary context
  const {
    userImages,
    displayedImage,
    dispatch: cloudinaryDispatch,
  } = useContext(CloudinaryContext);
  /// Get spotify from Spotify Context
  const {
    playingTrack,
    isPlayingSpotify,
    dispatch: spotifyDispatch,
  } = useContext(SpotifyContext);
  /// Get audio from Audio Context
  const {
    audios,
    chosenAudio,
    dispatch: audioDispatch,
    isPlayingAudio,
  } = useContext(AudioContext);

  const handleSave = async () => {
    // console.log("Current tab index ", tabIndex);

    const session = {
      lastBackground: displayedImage,
      meditationAudio: chosenAudio,
      music: playingTrack?.uri,
      isPlayingAudio,
    };

    try {
      /// Create session
      const response = await axios.post(
        "http://localhost:4000/api/meditation/sessions",
        session,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      console.log("Response from creating session", response.data);

      onClose();
    } catch (err) {
      console.log("Error while creating session...", err);
    }
  };

  return (
    <>        
    <BackgroundMain />
    <Button colorScheme="blue" onClick={handleSave}>
      Save
    </Button>
         
    </>
  );
};

export default MeditationDrawer;
