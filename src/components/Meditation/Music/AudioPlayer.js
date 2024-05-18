import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayer.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Button, ButtonGroup, Stack, HStack, VStack, StackDivider, Flex } from '@chakra-ui/react'

const Player = () => {
    const [audioUrl, setAudioUrl] = useState('');

    const getAudio = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/cloudinary/audios/most-recent');
            console.log("Response from get audio", response.data)
            setAudioUrl(response.data);
        } catch (error) {
            console.error('Error getting audio:', error);
        }
    }

    useEffect(() => {
        getAudio();
    }, [audioUrl]);

    return (

        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            // align='stretch'
        >
            < AudioPlayer className='audio-player'
                // src="https://res.cloudinary.com/dufirricm/video/upload/v1715991294/PeacePod/Audios/Sample02_vjcfi8.wav"
                src={audioUrl}
                onPlay={(e) => console.log("onPlay")}
                autoPlay={false}
                volume={0.5}
                progressJumpStep={10000}
                layout="horizontal"
                controls
                header="Now playing: Let it go!"
            />
            <Button colorScheme='blue' onClick={getAudio}>Generate</Button>
        </VStack>

    );
};

export default Player;