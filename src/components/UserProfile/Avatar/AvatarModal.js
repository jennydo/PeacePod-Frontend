import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    VStack, 
    Image
  } from '@chakra-ui/react'
import CustomizeAvatar from './CustomizeAvatar'
import React from 'react'
import { useAvatarContext } from '../../../hooks/useAvatarContext'
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect} from 'react';

const AvatarModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const { avatar, avatarData } = useAvatarContext()
    const { user } = useAuthContext()
    const userId = user.user._id;

    const handleClick = () => {
        onClose();
        console.log('avatar data', avatarData);
        axios.patch(`http://localhost:4000/api/users/${userId}`, {
            avatar: avatar,
            avatarData: avatarData
        })
        .then(response => {
            // Handle success
            console.log('Avatar updated successfully:', response.data);

            // update that field in localStorage
            const userLocalStorage = JSON.parse(localStorage.getItem('user'));
            userLocalStorage.user.avatar = response.data.avatar; 
            userLocalStorage.user.avatarData = response.data.avatarData;
            // console.log('Avatar saved in localStorage successfully:', userLocalStorage)
            localStorage.setItem('user', JSON.stringify(userLocalStorage));

            // update the userContext 
            // user.user.avatar = response.data.avatar; 
            // dispatch({
            //     type: 'UPDATE',
            //     // payload: user
            //     // payload: { ...user, avatar: response.data.avatar}
            //     // payload: response.data.avatar
            //     payload: userLocalStorage
            // })

            // console.log('User after dispatch:', user);

        })
        .catch(error => {
            // Handle error
            console.error('Error updating avatar:', error);
        });
        }

    return ( 
        <>
        <Button ref={finalRef} onClick={onOpen}>Edit Your Avatar</Button>

        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="lg">
            <ModalOverlay />
            <ModalContent>
            <ModalHeader display="flex" justifyContent="center" alignItems="center">
                <VStack>
                    <h2>Customize your Avatar</h2>
                    {avatar && 
                        <Image
                        src={avatar}
                        alt="User Profile"
                        borderRadius='full'
                        objectFit='cover'
                        />}
                </VStack>
            </ModalHeader>
            {/* <ModalCloseButton /> */}

            <ModalBody>
                <CustomizeAvatar/>
            </ModalBody>
                
            <ModalFooter display="flex" justifyContent="center" alignItems="center">
                <Button colorScheme='blue' mr={3} onClick={handleClick} >
                    Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
     );
}
 
export default AvatarModal;