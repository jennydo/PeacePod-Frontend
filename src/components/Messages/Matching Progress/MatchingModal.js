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
import React, { useContext, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import ChooseOption from "./ChooseOption";
import Survey from "./Survey";
import Congratulations from "./Congratulations";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

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
          surveyResponse={surveyResponse}
          setSurveyResponse={setSurveyResponse}
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
          <VStack minH={300} maxH={300}>
            {steps[activeStep].component}
          </VStack>
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
            onClick={handleNext}
            colorScheme={activeStep === steps.length - 1 ? "blue" : "gray"}
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
