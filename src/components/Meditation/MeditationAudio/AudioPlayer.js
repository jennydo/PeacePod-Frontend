import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayer.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Button, VStack, StackDivider } from '@chakra-ui/react'
import { AudioContext } from '../../../context/AudioContext';

const Player = () => {
    const { chosenAudio } = useContext(AudioContext)

    console.log("chosen audio in audio playerrrrr", chosenAudio)

    return (

        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            // align='stretch'
        >
            < AudioPlayer className='audio-player'
                // src="https://res.cloudinary.com/dufirricm/video/upload/v1715991294/PeacePod/Audios/Sample02_vjcfi8.wav"
                src={chosenAudio?.audio}
                onPlay={(e) => console.log("onPlay")}
                autoPlay={false}
                volume={0.5}
                progressJumpStep={10000}
                layout="horizontal"
                controls
                header={`Now playing: ${chosenAudio?.title}`}
            />
        </VStack>

    );
};

export default Player;