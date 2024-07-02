/* eslint-disable no-prototype-builtins */
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
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import ChooseOption from "./ChooseOption";
import Survey from "./Survey";
import Congratulations from "./Congratulations";
import axios from "axios";

const MatchingModal = ({ finalRef, isOpen, onClose }) => {
  const [option, setOption] = useState(1);
  const [surveyResponse, setSurveyResponse] = useState(null);
  const [error, setError] = useState(null);

  const { user, token } = JSON.parse(localStorage.getItem("user"));

  const steps = [
    {
      title: "First",
      description: "Choose matching option",
      component: <ChooseOption option={option} setOption={setOption} />,
    },
    {
      title: "Second",
      description: "Fill form",
      component: (
        <Survey
          setSurveyResponse={setSurveyResponse}
          surveyResponse={surveyResponse}
        />
      ),
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
    setError(null);
    if (activeStep === 0) return;
    else {
      goToPrevious();
      if (activeStep === steps.length - 1 && option === 1) goToPrevious();
    }
  };

  const submitSurvey = async () => {
    console.log("Survey response", surveyResponse);

    if (
      !surveyResponse ||
      !surveyResponse.hasOwnProperty("feeling") ||
      !surveyResponse.hasOwnProperty("coreValue") ||
      !surveyResponse.hasOwnProperty("gratefulFor") ||
      !surveyResponse.hasOwnProperty("practice") ||
      !surveyResponse.hasOwnProperty("motivation")
    ) {
      setError("Missing fields");
    } else {
      /// Clear error
      setError(null);

      /// API call
      try {
        const response = await axios.post(
          "http://localhost:4000/api/matchUsers",
          surveyResponse,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response from creating new match user", response.data);
        goToNext();
      } catch (err) {
        console.log("Error while submitting survey", err);
        // setError(err?.message)
      }
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      /// Update state of user in localStorage as waiting for match
      localStorage.setItem(
        "user",
        JSON.stringify({ user, token, isWaitingForMatch: true })
      );

      /// Close the modal
      onClose();
    } else if (activeStep == 1) {
      /// Need to handle submit survey
      if (activeStep === 1) {
        submitSurvey();
      }
    } else {
      goToNext();
      if (activeStep === 0 && option === 1) goToNext();
    }
  };

  return (
    <Modal
      isCentered
      finalFocusRef={finalRef}
      h="100%"
      isOpen={isOpen}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      size="4xl"
      w="100vw"
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="3xl" textAlign="center">
            👋 Please follow the given steps 👋
          </Text>
          <Stepper index={activeStep} size="lg">
            {steps.map((step, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    active={<StepNumber />}
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
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
          <VStack maxH={300} minH={300}>
            {steps[activeStep].component}
          </VStack>
        </ModalBody>

        <ModalFooter gap={5} justifyContent="flex-end">
          <Button leftIcon={<IoIosArrowBack />} onClick={handlePrev}>
            Prev
          </Button>
          <Button
            colorScheme={activeStep === steps.length - 1 ? "blue" : "gray"}
            rightIcon={
              activeStep === steps.length - 1 ? (
                <IoIosSend color="blue" style={{ color: "blue" }} />
              ) : (
                <IoIosArrowForward />
              )
            }
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Done" : "Next"}
          </Button>
        </ModalFooter>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MatchingModal;
