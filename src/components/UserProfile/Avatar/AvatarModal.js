import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    useDisclosure,
    VStack, 
    Image
  } from '@chakra-ui/react';
import CustomizeAvatar from './CustomizeAvatar';
import React from 'react';
import { useAvatarContext } from '../../../hooks/useAvatarContext';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { StyledButton} from '../../../styles/components/StyledComponents';

const AvatarModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { avatar, avatarData } = useAvatarContext();
    const { user } = useAuthContext();
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
        };

    return ( 
        <>
        <StyledButton text="Edit Your Avatar" onClick={onOpen}/>

        <Modal isOpen={isOpen} scrollBehavior="inside" size="lg"
onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader alignItems="center" display="flex" justifyContent="center">
                <VStack>
                    <h2>Customize your Avatar</h2>
                    {avatar && 
                        <Image
                        alt="User Profile"
                        borderRadius='full'
                        objectFit='cover'
                        src={avatar}
                        />}
                </VStack>
            </ModalHeader>
            {/* <ModalCloseButton /> */}

            <ModalBody>
                <CustomizeAvatar/>
            </ModalBody>
                
            <ModalFooter alignItems="center" display="flex" justifyContent="center">
                <Button colorScheme='blue' mr={3} onClick={handleClick} >
                    Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
     );
};
 
export default AvatarModal;