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

const AvatarModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const { avatar } = useAvatarContext()
    const { user } = useAuthContext()
    const userId = user.user._id;

    const handleClick = () => {
        onClose();
        axios.patch(`http://localhost:4000/api/users/${userId}`, {
            avatar: avatar
        })
        .then(response => {
            // Handle success
            console.log('Avatar updated successfully:', response.data);
            // update that field in localStorage
            const userLocalStorage = JSON.parse(localStorage.getItem('user'));
            userLocalStorage.user.avatar = response.data.avatar; 
            console.log('Avatar saved in localStorage successfully:', userLocalStorage)
            localStorage.setItem('user', JSON.stringify(userLocalStorage));
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
                    <h1>Customize your Avatar</h1>
                    {avatar && 
                        <Image
                        src={avatar}
                        alt="User Profile"
                        borderRadius='full'
                        objectFit='cover'
                        />}
                </VStack>
            </ModalHeader>
            <ModalCloseButton />

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