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
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import { StyledBox } from "../../../styles/components/StyledComponents.js";

const SignUp = () => {
  const { dispatch: avatarDispatch } = useAvatarContext();
  const [page, setPage] = useState(1);

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
      });
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
      <Stack spacing='24px' display={page === 2 ? 'none' : ''}>
          {/* Username, Email */}
          <Stack>
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
          <FormControl isRequired>
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
            </FormControl>
          </Stack>

          <Stack className="password">
            <FormControl isRequired>
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
            </FormControl>
          </Stack>

          <Stack className='dob'>
            <FormControl isRequired>
              <FormLabel>Your Date of Birth</FormLabel>
              <Input
                type="date"
                value={dob}
                placeholder="Select Date of Birth"
                onChange={(event) => setDob(event.target.value)}
              />
            </FormControl>
          </Stack>

          {/* Cancel and Create buttons */}
        <Stack direction="row" justify="flex-end" marginTop={5}>
          <Button
            onClick={() => setPage(2)}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            disabled={isLoading}
            colorScheme="teal"
            variant="outline"
          >
            Next
          </Button>
        </Stack>
        <br />
      </Stack>
      </Stack>

      <Stack display={page === 1 ? 'none' : ''}>
        {/* CHOOSE PRONOUN */}
        <Stack className="pronouns">
          <FormControl isRequired>
            <FormLabel>Pronouns</FormLabel>
            <ButtonGroup>
              {pronouns &&
                pronouns.map((pronoun, index) => (
                  <StyledBox 
                    key={index}
                    children={pronoun}
                    selected={selectedPronoun === pronoun}
                    onClick={(e) => setSelectedPronoun(pronoun)}
                    className="signup-attributes"
                  />
                ))}
            </ButtonGroup>
          </FormControl>
        </Stack>

        {/* CHOOSE GENDER */}
        <Stack className="genders">
          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <ButtonGroup>
              {genders &&
                genders.map((gender, index) => (
                  <StyledBox 
                    key={index}
                    children={gender}
                    selected={selectedGender === gender}
                    onClick={(e) => setSelectedGender(gender)}
                    className="signup-attributes"
                  />
                ))}
            </ButtonGroup>
          </FormControl>

          <Checkbox onChange={() => setShowGender(!showGender)}>
            Show gender on my profile
          </Checkbox>
        </Stack>

        {/* CHOOSE SEXUAL ORIENTATION */}
        <Stack className="sexualities">
          <FormControl isRequired>
            <FormLabel>Sexual Orientation</FormLabel>
            <ButtonGroup>
              {selectedSexualities &&
                selectedSexualities.map((sexuality, index) => (
                  <StyledBox 
                    key={index}
                    children={sexuality}
                    className="signup-attributes multi-select"
                  />
                ))}
            </ButtonGroup>
          </FormControl>
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
          <FormControl isRequired>
          <FormLabel>Location</FormLabel>
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

        {/* CHOOSE INTERESTS */}
        <Stack className="interests">
          <FormLabel>Interests</FormLabel>
          <ButtonGroup>
            {selectedInterests &&
              selectedInterests.map((interest, index) => (
                <StyledBox 
                  key={index}
                  children={interest}
                  className="signup-attributes multi-select"
                />
              ))}
          </ButtonGroup>
          <InterestModal
            interestList={interestList}
            alreadySelectedInterests={selectedInterests}
            setAlreadySelectedInterests={setSelectedInterests}
          />
        </Stack>
        <Stack>
          <FormLabel>Let us know more about you:</FormLabel>
          <Textarea
            placeholder="Your bio, limited to 100 words or less."
            onChange={(e) => setBio(e.target.value)}
          />
        </Stack>
      
        {/* Cancel and Create buttons */}
        <Stack direction="row" spacing={4} justify="flex-end">
          <Button
            onClick={() => setPage(1)}
            disabled={isLoading}
            colorScheme="teal"
            variant="ghost"
            marginTop={5}
          >
            Previous
          </Button>
          <Button
            onClick={() => handleSubmit()}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            disabled={isLoading}
            colorScheme="teal"
            variant="outline"
            marginTop={5}
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
