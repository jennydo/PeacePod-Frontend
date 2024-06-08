import React, { useState } from "react";
import SexualityModal from "./SexualityModal.js";
import {
  pronouns,
  genders,
  sexualities,
  countries,
  interestList,
} from "./userConstants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Button,
  ButtonGroup,
  Checkbox,
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
  Textarea,
  Select,
  Alert,
  AlertDescription,
  AlertIcon,
  IconButton,
} from "@chakra-ui/react";
import InterestModal from "./InterestModal.js";
import { useAuthContext } from "../../../hooks/useAuthContext.js";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAvatarContext } from "../../../hooks/useAvatarContext.js";

const SignUp = () => {
  const { dispatch: avatarDispatch } = useAvatarContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = React.useState(false);
  const handleClickPassword = () => setShowPw(!showPw);

  const [showRetypePw, setShowRetypePw] = React.useState(false);
  const handleClickPasswordReType = () => setShowRetypePw(!showRetypePw);

  const [dob, setDob] = useState(false);

  const [selectedPronoun, setSelectedPronoun] = useState(null);

  const [selectedGender, setSelectedGender] = useState(null);
  const [showGender, setShowGender] = useState(false);

  const [selectedSexualities, setSelectedSexualities] = useState([]);
  const [showSexuality, setShowSexuality] = useState(false);

  const [location, setLocation] = useState(null);

  const [selectedInterests, setSelectedInterests] = useState([]);

  const [bio, setBio] = useState("");

  const handleSubmit = async () => {
    const newUser = {
      username,
      password,
      email,
      dob,
      pronounce: selectedPronoun,
      gender: selectedGender,
      sexualOrientation: selectedSexualities,
      location,
      interests: selectedInterests,
      bio,
    };

    const response = await fetch("http://localhost:4000/api/users/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log("error sign up", error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      avatarDispatch({
        type: "SET_AVATAR_DATA", 
        payload: json.user.avatarData
      })
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return (
    <Container
      className="signup-page"
      bg="whiteAlpha.900"
      p={30}
      h="100%"
      mb={30}
      borderRadius={10}
    >
      <Stack>
        {/* <Grid templateColumns="70% 30%" gap={15}> */}
        <Heading textAlign="center">Create your account</Heading>
        <Stack>
          {/* Username, Email */}
          <Stack className="username">
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
          </Stack>
          <Stack className="email">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </Stack>

          {/* Password */}
          <Stack className="password">
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPw ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={handleClickPassword}
                  bg={"ghost"}
                  icon={showPw ? <FaEye /> : <FaEyeSlash />}
                />
              </InputRightElement>
            </InputGroup>
          </Stack>

          <Stack className="password">
            <FormLabel>Re-type Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showRetypePw ? "text" : "password"}
                placeholder="Re-type password"
              />
              <InputRightElement>
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={handleClickPasswordReType}
                  bg={"ghost"}
                  icon={showRetypePw ? <FaEye /> : <FaEyeSlash />}
                />
              </InputRightElement>
            </InputGroup>
          </Stack>

          <Stack className='dob'>
            <FormLabel>Your Date of Birth</FormLabel>
            <Input
              type="date"
              value={dob}
              placeholder="Select Date of Birth"
              onChange={(event) => setDob(event.target.value)}
            />
          </Stack>
        </Stack>

        {/* <Stack align="center">
                        <Heading as="h4" size="sm">
                            Avatar Upload
                        </Heading>
                        <Image
                            boxSize='150px'
                            objectFit='cover'
                            borderRadius="30px"
                            src='https://res.cloudinary.com/khoa165/image/upload/q_100/v1577895922/portfolio/avatar.jpg'
                        />
                        <Button colorScheme='teal' variant='solid'>
                            Upload
                        </Button>
                    </Stack> */}

        {/* </Grid> */}

        {/* CHOOSE PRONOUN */}
        <Stack className="pronouns">
          <Heading as="h4" size="sm">
            Pronouns:{" "}
          </Heading>
          <ButtonGroup variant="solid">
            {pronouns &&
              pronouns.map((pronoun, index) => (
                <Button
                  key={index}
                  className="pronoun-option"
                  colorScheme={selectedPronoun === pronoun ? "blue" : "gray"}
                  value={pronoun}
                  onClick={(e) => setSelectedPronoun(e.target.value)}
                  borderRadius="100px"
                >
                  {pronoun}
                </Button>
              ))}
          </ButtonGroup>
        </Stack>

        {/* CHOOSE GENDER */}
        <Stack className="genders">
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

          <Checkbox onChange={() => setShowGender(!showGender)}>
            Show gender on my profile
          </Checkbox>
        </Stack>

        {/* CHOOSE SEXUAL ORIENTATION */}
        <Stack className="sexualities">
          <Heading as="h4" size="sm">
            Sexual Orientations:{" "}
          </Heading>
          <Stack direction={["column", "row"]} spacing="5px" wrap="wrap">
            {selectedSexualities &&
              selectedSexualities.map((sexuality, index) => (
                <Box
                  as="button"
                  key={index}
                  className="sexualities"
                  borderRadius="md"
                  bg="pink"
                  color="white"
                  px={4}
                  h={8}
                  minWidth="auto"
                >
                  {sexuality}
                </Box>
              ))}
          </Stack>
          <SexualityModal
            sexualities={sexualities}
            alreadySelectedSexualities={selectedSexualities}
            setAlreadySelectedSexualities={setSelectedSexualities}
          />
          <Checkbox onChange={() => setShowSexuality(!showSexuality)}>
            Show sexual orientations on my profile
          </Checkbox>
        </Stack>

        <Stack>
          <Heading as="h4" size="sm">
            Location
          </Heading>
          <FormControl>
            <Select
              placeholder="Select country"
              onChange={(e) => setLocation(e.target.value)}
            >
              {countries &&
                countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Stack>

        {/* OPTIONAL FIELDS */}
        <Box position="relative">
          <Divider />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="white"
            px="4"
            height="100%"
          >
            OPTIONAL
          </Box>
        </Box>

        {/* CHOOSE INTERESTS */}
        <Stack className="interests">
          <Heading as="h4" size="sm">
            Interests:{" "}
          </Heading>
          <Stack direction={["column", "row"]} spacing="5px" wrap="wrap">
            {selectedInterests &&
              selectedInterests.map((interest, index) => (
                <Box
                  as="button"
                  key={index}
                  className="interests"
                  borderRadius="md"
                  bg="pink"
                  color="white"
                  px={4}
                  h={8}
                  minWidth="auto"
                >
                  {interest}
                </Box>
              ))}
          </Stack>
          <InterestModal
            interestList={interestList}
            alreadySelectedInterests={selectedInterests}
            setAlreadySelectedInterests={setSelectedInterests}
          />
        </Stack>
        <Stack>
          <Heading as="h4" size="sm">
            Bio
          </Heading>
          <Textarea
            placeholder="Your bio, limited to 100 words or less."
            onChange={(e) => setBio(e.target.value)}
          />
        </Stack>
        <br />

        {/* Cancel and Create buttons */}
        <Stack direction="row" spacing={4} justify="flex-end">
          <Button colorScheme="gray" variant="solid">
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit()}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            disabled={isLoading}
            colorScheme="teal"
            variant="outline"
          >
            Create
          </Button>
        </Stack>

        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Stack>
    </Container>
  );
};

export default SignUp;
