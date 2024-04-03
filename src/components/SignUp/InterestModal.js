import React from 'react';
import { 
    Button, ButtonGroup, 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
    Center} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

function InterestModal({interestList, alreadySelectedInterests, setAlreadySelectedInterests }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleInterestSelected = (interest) => {
        if (alreadySelectedInterests.includes(interest)) {
            setAlreadySelectedInterests(alreadySelectedInterests.filter(item => item !== interest));
        } else {
            setAlreadySelectedInterests([...alreadySelectedInterests, interest]);
        }
    };
  
    return (
      <>
  
        <Button mt={4} onClick={onOpen}>
          Select
        </Button>
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            blockScrollOnMount={false}
            motionPreset='slideInBottom'
            scrollBehavior='inside'
            size='xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select your interests</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Center>
                    <ButtonGroup variant='solid' 
                                display="flex" 
                                flexWrap="wrap" 
                                justifyContent="center"  
                                alignItems="center"      
                                >
                        {interestList && interestList.map((interest) => (
                            <Button
                                key={interest}
                                className="interest-option"
                                colorScheme={alreadySelectedInterests.includes(interest) ? "blue" : "gray"}
                                onClick={() => handleInterestSelected(interest)}
                                m={1}>
                                {interest}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Center>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} mx="auto" onClick={onClose}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default InterestModal