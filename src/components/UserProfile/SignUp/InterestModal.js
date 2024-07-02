import React from 'react';
import {
  Button, ButtonGroup,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  Center
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

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
        blockScrollOnMount={false}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        scrollBehavior='inside'
        size='xl'
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select the 5 topics that interest you most</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <ButtonGroup alignItems="center"
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                variant='solid'
              >
                {interestList && interestList.map((interest, index) => (
                  <Button
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="interest-option"
                    colorScheme={alreadySelectedInterests.includes(interest) ? "blue" : "gray"}
                    m={1}
                    onClick={() => handleInterestSelected(interest)}>
                    {alreadySelectedInterests.includes(interest) ? `${alreadySelectedInterests.indexOf(interest) + 1}. ${interest}` : interest}
                  </Button>
                ))}
              </ButtonGroup>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} mx="auto"
onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InterestModal;

