import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./AudioPlayer.css";
import { useContext } from "react";
import { VStack, StackDivider } from "@chakra-ui/react";
import { AudioContext } from "../../../context/AudioContext";

const Player = () => {
  const { chosenAudio, isPlayingAudio } = useContext(AudioContext);

  // console.log(
  //   "chosen audio in audio player and spotify track",
  //   chosenAudio,
  //   playingTrack?.uri,
  //   isPlayingAudio
  // );

  return (
    <VStack maxH={'100%'} >
      <div className="audio-player-wrapper">
        <div className="audio-header">
          Now playing
          <br />
          {chosenAudio?.title}
        </div>
        <AudioPlayer
          className="audio-player"
          src={chosenAudio?.audio}
          onPlay={(e) => console.log("onPlay")}
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          volume={0.5}
          layout="stacked-reverse"
          progressJumpStep={10000}
          showJumpControls={false}
          showSkipControls={true}
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
          ]}
          customControlsSection={[
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          customAdditionalControls={[]}
          customVolumeControls={[RHAP_UI.VOLUME]}
        />
      </div>
    </VStack>
  );
};

export default Player;
