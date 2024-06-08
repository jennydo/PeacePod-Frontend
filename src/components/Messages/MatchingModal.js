import {
  Button,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  ButtonGroup,
  Stack,
  Heading,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { genders } from "../UserProfile/SignUp/userConstants";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

const MatchingModal = ({ finalRef, isOpen, onClose }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [showGender, setShowGender] = useState(false);

  const steps = [
    { title: "First", description: "Choose matching option" },
    { title: "Second", description: "Fill form" },
    { title: "Third", description: "Congratulations" },
  ];

  const { activeStep, goToPrevious, goToNext } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handlePrev = () => {
    if (activeStep === 0) return;
    else goToPrevious();
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) return;
    else goToNext();
  };

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      scrollBehavior="inside"
      isCentered
      motionPreset="slideInBottom"
      w="100vw"
      h="100%"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize={"3xl"}>
          👋 Welcome to our matching feature! Please follow the given steps 👋
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {/* <Stack className="genders">
            <Heading as="h4" size="sm">
              Gender:{" "}
            </Heading>

            <ButtonGroup variant="solid">
              {genders &&
                genders.map((gender, index) => (
                  <Button
                    key={index}
                    className="gender-option"
                    colorScheme={selectedGender === gender ? "blue" : "gray"}
                    value={gender}
                    onClick={(e) => setSelectedGender(e.target.value)}
                    borderRadius="100px"
                  >
                    {gender}
                  </Button>
                ))}
            </ButtonGroup>
          </Stack> */}
          <Stepper index={activeStep} size={"lg"}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box>
                  <StepTitle mb={0}>{step.title}</StepTitle>
                  <StepDescription mb={0}>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </ModalBody>

        <ModalFooter justifyContent="flex-end" gap={5}>
          <Button leftIcon={<IoIosArrowBack />} onClick={handlePrev}>
            Prev
          </Button>
          <Button
            rightIcon={
              activeStep === steps.length - 1 ? (
                <IoIosSend color="blue" style={{'color': 'blue'}}/>
              ) : (
                <IoIosArrowForward />
              )
            }
            onClick={activeStep === steps.length - 1? onClose : handleNext}
            colorScheme={activeStep === steps.length - 1? "blue" : "gray"}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MatchingModal;
