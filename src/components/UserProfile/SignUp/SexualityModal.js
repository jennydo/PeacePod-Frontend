import React from 'react';
import { 
    Button, 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, 
    Checkbox, Stack } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

function SexualityModal({sexualities, alreadySelectedSexualities, setAlreadySelectedSexualities }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setAlreadySelectedSexualities([...alreadySelectedSexualities, value]);
        } else {
            setAlreadySelectedSexualities(alreadySelectedSexualities.filter(item => item !== value));
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
          onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select your sexual orientations.</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack direction='column' spacing={5}>
                  {sexualities.map((sexuality, index) => (
                    <Checkbox
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="sexuality-option"
                      defaultChecked={alreadySelectedSexualities.includes(sexuality)}
                      value={sexuality}
                      onChange={handleCheckboxChange}>
                                {sexuality}
                    </Checkbox>
                    ))}
                </Stack>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} mx="auto"
onClick={onClose}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

export default SexualityModal;