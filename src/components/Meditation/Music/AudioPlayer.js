import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, { useState } from 'react';
import './AudioPlayer.css';


const Player = () => {
    return (
        <AudioPlayer className='audio-player'
            src="https://res.cloudinary.com/dufirricm/video/upload/v1715977114/Audios/Sample01.mp3"
            onPlay={(e) => console.log("onPlay")}
            autoPlay={false}
            volume={0.8}
            progressJumpStep={10000}
            layout="horizontal"
            controls
            header="Now playing: Let it go!"
        />
    );
};

export default Player;