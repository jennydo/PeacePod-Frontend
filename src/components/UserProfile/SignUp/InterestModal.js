import React from 'react';
import {
  Button, ButtonGroup,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  Center
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { StyledButton } from '../../../styles/components/StyledComponents';


function InterestModal({ interestList, alreadySelectedInterests, setAlreadySelectedInterests }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInterestSelected = (interest) => {
    if (alreadySelectedInterests.includes(interest)) {
      setAlreadySelectedInterests(alreadySelectedInterests.filter(item => item !== interest));
    } else {
      if (alreadySelectedInterests.length < 5) {
        setAlreadySelectedInterests([...alreadySelectedInterests, interest]);
      }
    }
  };

  const handleSave = () => {
    if (alreadySelectedInterests.length === 5) {
      // Save the selected interests
      onClose();
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
          <ModalHeader>Select the 5 topics that interest you most</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <ButtonGroup variant='solid'
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
              >
                {interestList && interestList.map((interest, index) => (
                  <Button
                    key={index}
                    className="interest-option"
                    colorScheme={alreadySelectedInterests.includes(interest) ? "blue" : "gray"}
                    onClick={() => handleInterestSelected(interest)}
                    m={1}>
                    {alreadySelectedInterests.includes(interest) ? `${alreadySelectedInterests.indexOf(interest) + 1}. ${interest}` : interest}
                  </Button>
                ))}
              </ButtonGroup>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} mx="auto" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InterestModal;

