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

const Survey = () => {
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

          <Select>
            <option value="" selected disabled hidden>
              e.g. grounded and at peace
            </option>
            {feelings &&
              feelings.map((feeling, index) => (
                <option
                  key={index}
                  className="feeling-option"
                  value={feeling}
                  onClick={(e) => setSelectedFeeling(e.target.value)}
                >
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

          <Select>
            <option value="" selected disabled hidden>
              e.g. Integrity and Truth
            </option>
            {coreValues &&
              coreValues.map((coreValue, index) => (
                <option
                  key={index}
                  className="coreValue-option"
                  value={coreValue}
                  onClick={(e) => setSelectedCoreValue(e.target.value)}
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

          <Select>
            <option value="" selected disabled hidden>
              e.g. Personal Strengths and Abilities
            </option>
            {gratefulFor &&
              gratefulFor.map((grateful, index) => (
                <option
                  key={index}
                  className="grateful-option"
                  value={grateful}
                  onClick={(e) => setSelectedGratefulFor(e.target.value)}
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

          <Select>
            <option value="" selected disabled hidden>
              e.g. Quality sleep - Restorative focus
            </option>
            {practices &&
              practices.map((practice, index) => (
                <option
                  key={index}
                  className="practice-option"
                  value={practice}
                  onClick={(e) => setSelectedPractice(e.target.value)}
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

          <Select>
            <option value="" selected disabled hidden>
              e.g. Personal Growth
            </option>
            {motivations &&
              motivations.map((motivation, index) => (
                <option
                  key={index}
                  className="motivation-option"
                  value={motivation}
                  onClick={(e) => setSelectedMotivation(e.target.value)}
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
