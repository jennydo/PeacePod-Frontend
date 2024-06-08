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
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import ChooseOption from "./Matching Progress/ChooseOption";
import Survey from "./Matching Progress/Survey";
import Congratulations from "./Matching Progress/Congratulations";

const MatchingModal = ({ finalRef, isOpen, onClose }) => {

  const [option, setOption] = useState(null);

  const steps = [
    {
      title: "First",
      description: "Choose matching option",
      component: <ChooseOption option={option} setOption={setOption} />,
    },
    {
      title: "Second",
      description: "Fill form",
      component: <Survey />,
    },
    {
      title: "Third",
      description: "Congratulations",
      component: <Congratulations />,
    },
  ];

  const { activeStep, goToPrevious, goToNext } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handlePrev = () => {
    if (activeStep === 0) return;
    else {
        goToPrevious()
        if (activeStep == steps.length - 1 && option == 1)
            goToPrevious()
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) return;
    else {
      goToNext();
      if (activeStep == 0 && option == 1)
        goToNext()
    }
  };

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      scrollBehavior="inside"
      isCentered
      motionPreset="slideInBottom"
      w="100vw"
      h="100%"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign="center" fontSize={"3xl"}>
            👋 Please follow the given steps 👋
          </Text>
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
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <VStack minH={300} maxH={300}>{steps[activeStep].component}</VStack>
        </ModalBody>

        <ModalFooter justifyContent="flex-end" gap={5}>
          <Button leftIcon={<IoIosArrowBack />} onClick={handlePrev}>
            Prev
          </Button>
          <Button
            rightIcon={
              activeStep === steps.length - 1 ? (
                <IoIosSend color="blue" style={{ color: "blue" }} />
              ) : (
                <IoIosArrowForward />
              )
            }
            onClick={activeStep === steps.length - 1 ? onClose : handleNext}
            colorScheme={activeStep === steps.length - 1 ? "blue" : "gray"}
          >
            {activeStep === steps.length - 1 ? "Done" : "Next"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MatchingModal;
