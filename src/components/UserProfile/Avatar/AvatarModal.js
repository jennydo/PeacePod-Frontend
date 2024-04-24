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
    VStack
  } from '@chakra-ui/react'
import CustomizeAvatar from './CustomizeAvatar'
import React from 'react'
import { useAvatarContext } from '../../../hooks/useAvatarContext'

const AvatarModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const { avatar } = useAvatarContext()

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
                        <img
                            src={avatar}
                            alt="User Profile"
                        />}
                </VStack>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <CustomizeAvatar/>
            </ModalBody>
                
            <ModalFooter display="flex" justifyContent="center" alignItems="center">
                <Button colorScheme='blue' mr={3} onClick={onClose} >
                    Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
     );
}
 
export default AvatarModal;