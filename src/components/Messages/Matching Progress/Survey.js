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
  meditationFeelings,
  meditationPractices,
  meditationPlaces,
  meditationChallenges,
  meditationGoals,
  meditationImpacts,
  meditationTools,
  meditationWith,
} from "./matchingConstants";

const Survey = () => {
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedImpact, setSelectedImpact] = useState(null);
  const [selectedWith, setSelectedMeditationWith] = useState(null);

  return (
    <>
      <Heading>Let us know more about you 😁</Heading>
      <VStack w={"65%"} justifyContent={"flex-start"}>
        <Stack className="feelings" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            How have you been feeling lately?
          </Heading>

          <Select placeholder="e.g. grounded and at peace">
            {meditationFeelings &&
              meditationFeelings.map((feeling, index) => (
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

        <Stack className="practices" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            What type of meditation do you practice most frequently?
          </Heading>

          <Select placeholder="e.g. guided">
            {meditationPractices &&
              meditationPractices.map((practice, index) => (
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

        <Stack className="places" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            Where do you usually meditate?
          </Heading>

          <Select placeholder="e.g. at home in a dedicated space">
            {meditationPlaces &&
              meditationPlaces.map((place, index) => (
                <option
                  key={index}
                  className="place-option"
                  value={place}
                  onClick={(e) => setSelectedPlace(e.target.value)}
                >
                  {place}
                </option>
              ))}
          </Select>
        </Stack>

        <Stack className="goals" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            What guided you to start meditating?
          </Heading>

          <Select placeholder="e.g. To reduce stress and anxiety">
            {meditationGoals &&
              meditationGoals.map((goal, index) => (
                <option
                  key={index}
                  className="goal-option"
                  value={goal}
                  onClick={(e) => setSelectedGoal(e.target.value)}
                >
                  {goal}
                </option>
              ))}
          </Select>
        </Stack>

        <Stack className="tools" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            Do you use any tools or aids during meditation?
          </Heading>

          <Select placeholder="e.g. Meditation apps">
            {meditationTools &&
              meditationTools.map((tool, index) => (
                <option
                  key={index}
                  className="tool-option"
                  value={tool}
                  onClick={(e) => setSelectedTool(e.target.value)}
                >
                  {tool}
                </option>
              ))}
          </Select>
        </Stack>

        <Stack className="challenges" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            What do you find most challenging about meditation?
          </Heading>

          <Select placeholder="e.g. Staying focused and avoiding distractions">
            {meditationChallenges &&
              meditationChallenges.map((challenge, index) => (
                <option
                  key={index}
                  className="challenge-option"
                  value={challenge}
                  onClick={(e) => setSelectedChallenge(e.target.value)}
                >
                  {challenge}
                </option>
              ))}
          </Select>
        </Stack>

        <Stack className="impacts" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            How has meditation impacted your daily life?
          </Heading>

          <Select placeholder="e.g. Improved stress management">
            {meditationImpacts &&
              meditationImpacts.map((impact, index) => (
                <option
                  key={index}
                  className="impact-option"
                  value={impact}
                  onClick={(e) => setSelectedImpact(e.target.value)}
                >
                  {impact}
                </option>
              ))}
          </Select>
        </Stack>

        <Stack className="with" w={"100%"}>
          <Heading fontSize={"xl"} textAlign={"left"} w={"100%"}>
            Do you prefer to meditate alone or with others?
          </Heading>

          <Select placeholder="e.g. Alone">
            {meditationWith &&
              meditationWith.map((meditationWith, index) => (
                <option
                  key={index}
                  className="meditation-with-option"
                  value={meditationWith}
                  onClick={(e) => setSelectedMeditationWith(e.target.value)}
                >
                  {meditationWith}
                </option>
              ))}
          </Select>
        </Stack>
      </VStack>
    </>
  );
};

export default Survey;
