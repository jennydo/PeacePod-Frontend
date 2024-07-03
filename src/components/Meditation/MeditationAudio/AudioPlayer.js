import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./AudioPlayer.css";
import { useContext } from "react";
import { VStack } from "@chakra-ui/react";
import { AudioContext } from "../../../context/AudioContext";

const Player = () => {
    const { chosenAudio } = useContext(AudioContext);

  return (
    <VStack maxH="100%" >
      <div className="audio-player-wrapper">
        <div className="audio-header">
          Now playing
          <br />
          {chosenAudio?.title}
        </div>
        <AudioPlayer
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          className="audio-player"
          customAdditionalControls={[]}
          customControlsSection={[
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
          ]}
          customVolumeControls={[RHAP_UI.VOLUME]}
          layout="stacked-reverse"
          progressJumpStep={10000}
          showJumpControls={false}
          showSkipControls={true}
          src={chosenAudio?.audio}
          volume={0.5}
          onPlay={() => console.log("onPlay")}
        />
      </div>
    </VStack>
  );
};

export default Player;
