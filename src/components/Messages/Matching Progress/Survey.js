import React, { useState } from "react";
import {
  Stack,
  Heading,
  ButtonGroup,
  Button,
  Select,
  VStack,
} from "@chakra-ui/react";
import {
  feelings,
  coreValues,
  gratefulFor,
  practices,
  motivations,
} from "./matchingConstants";

const Survey = ({ surveyResponse, setSurveyResponse }) => {
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [selectedCoreValue, setSelectedCoreValue] = useState(null);
  const [selectedGratefulFor, setSelectedGratefulFor] = useState(null);
  const [selectedPratice, setSelectedPractice] = useState(null);
  const [selectedMotivation, setSelectedMotivation] = useState(null);

  return (
    <>
      <Heading>Let us know more about you 😁</Heading>
      <VStack w={"65%"} justifyContent={"flex-start"}>
        {/* 1. How have you been feeling lately */}
        <Stack className="feelings" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            How have you been feeling lately?
          </Heading>

          <Select
            placeholder="Select an option"
            value={selectedFeeling}
            onChange={(e) => {
              setSelectedFeeling(e.target.value);
              setSurveyResponse({
                ...surveyResponse,
                feeling: e.target.value,
              });
            }}
          >
            {feelings &&
              feelings.map((feeling, index) => (
                <option key={index} className="feeling-option" value={feeling}>
                  {feeling}
                </option>
              ))}
          </Select>
        </Stack>
        {/* 2. What core values light your path? */}
        <Stack className="core-values" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            What core values light your path?
          </Heading>

          <Select
            placeholder="Select an option"
            value={selectedCoreValue}
            onChange={(e) => {
              setSelectedCoreValue(e.target.value);
              setSurveyResponse({
                ...surveyResponse,
                coreValue: e.target.value,
              });
            }}
          >
            {coreValues &&
              coreValues.map((coreValue, index) => (
                <option
                  key={index}
                  className="coreValue-option"
                  value={coreValue}
                >
                  {coreValue}
                </option>
              ))}
          </Select>
        </Stack>
        {/* 3. When you look back on your life, what are you grateful for? */}
        <Stack className="grateful" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            When you look back on your life, what are you grateful for?
          </Heading>

          <Select
            placeholder="Select an option"
            value={selectedGratefulFor}
            onChange={(e) => {
              setSelectedGratefulFor(e.target.value);
              setSurveyResponse({
                ...surveyResponse,
                gratefulFor: e.target.value,
              });
            }}
          >
            {gratefulFor &&
              gratefulFor.map((grateful, index) => (
                <option
                  key={index}
                  className="grateful-option"
                  value={grateful}
                >
                  {grateful}
                </option>
              ))}
          </Select>
        </Stack>
        {/* 4. In moments of stress or uncertainty, what practices help you stay grounded? */}
        <Stack className="practices" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            In moments of stress or uncertainty, what practices help you stay
            grounded?
          </Heading>

          <Select
            placeholder="Select an option"
            value={selectedPratice}
            onChange={(e) => {
              setSelectedPractice(e.target.value);
              setSurveyResponse({
                ...surveyResponse,
                practice: e.target.value,
              });
            }}
          >
            {practices &&
              practices.map((practice, index) => (
                <option
                  key={index}
                  className="practice-option"
                  value={practice}
                >
                  {practice}
                </option>
              ))}
          </Select>
        </Stack>
        {/* 5. What motivates you to get out of bed in the morning? */}
        <Stack className="motivations" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            What motivates you to get out of bed in the morning?
          </Heading>

          <Select
            placeholder="Select an option"
            value={selectedMotivation}
            onChange={(e) => {
              setSelectedMotivation(e.target.value);
              setSurveyResponse({
                ...surveyResponse,
                motivation: e.target.value,
              });
            }}
          >
            {motivations &&
              motivations.map((motivation, index) => (
                <option
                  key={index}
                  className="motivation-option"
                  value={motivation}
                >
                  {motivation}
                </option>
              ))}
          </Select>
        </Stack>
      </VStack>
    </>
  );
};

export default Survey;
