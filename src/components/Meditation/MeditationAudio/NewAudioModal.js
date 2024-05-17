import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import CreateOwnSession from '../CreateOwnSession'

const NewAudioModal = ({ finalRef, isOpen, onClose}) => {
  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader textAlign='center'>
                Create your own meditation audio
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <CreateOwnSession />
            </ModalBody>

            <ModalFooter justifyContent='center'>   
                <Button>Create</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default NewAudioModal