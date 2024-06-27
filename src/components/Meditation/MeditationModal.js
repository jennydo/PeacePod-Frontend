import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Icon
  } from '@chakra-ui/react';
import { LuSettings2 } from "react-icons/lu";
import { useContext } from 'react';
import { CloudinaryContext } from '../../context/CloudinaryContext';
import { useSpotifyContext } from '../../hooks/useSpotifyContext';
import { AudioContext } from '../../context/AudioContext';
import SongPlayer from './Music/SongPlayer'
import Player from './MeditationAudio/AudioPlayer'

const MeditationModal = ({isOpen, onClose}) => {
    const { displayedImage } = useContext(CloudinaryContext);
    const { accessToken, playingTrack, isPlayingSpotify } = useSpotifyContext();
    const { isPlayingAudio } = useContext(AudioContext);

    return ( 
    <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color='white'/>
          <ModalBody 
            style={{
                backgroundImage: `url(${displayedImage})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat', 
              }}
            >
            <div className='meditation modal-icon'>
                <IconButton 
                    fontSize='25px' 
                    color='white' 
                    variant='ghost' 
                    icon={<Icon as={LuSettings2}/>}/>
            </div>
            <div className='meditation media-player'>
                {isPlayingSpotify && playingTrack && (
                    <SongPlayer
                    accessToken={accessToken}
                    trackUri={playingTrack?.uri}
                    />
                )}
                {isPlayingAudio && <Player />}
            </div>
                   
               
          </ModalBody>
        </ModalContent>
    </Modal>
     );
}
 
export default MeditationModal;