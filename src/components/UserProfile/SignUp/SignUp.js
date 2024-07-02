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
      bg="whiteAlpha.900"
      borderRadius={10}
      className="signup-page"
      h="100%"
      mb={30}
      p={30}
    >
      <Stack>
        {/* <Grid templateColumns="70% 30%" gap={15}> */}
        <Heading textAlign="center">Create your account</Heading>
      <Stack display={page === 2 ? 'none' : ''} spacing='24px'>
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
                  placeholder="Enter password"
                  pr="4.5rem"
                  type={showPw ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    bg="ghost"
                    h="1.75rem"
                    icon={showPw ? <FaEye /> : <FaEyeSlash />}
                    size="sm"
                    onClick={handleClickPassword}
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
                  placeholder="Re-type password"
                  pr="4.5rem"
                  type={showRetypePw ? "text" : "password"}
                />
                <InputRightElement>
                  <IconButton
                    bg="ghost"
                    h="1.75rem"
                    icon={showRetypePw ? <FaEye /> : <FaEyeSlash />}
                    size="sm"
                    onClick={handleClickPasswordReType}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>

          <Stack className='dob'>
            <FormControl isRequired>
              <FormLabel>Your Date of Birth</FormLabel>
              <Input
                placeholder="Select Date of Birth"
                type="date"
                value={dob}
                onChange={(event) => setDob(event.target.value)}
              />
            </FormControl>
          </Stack>

          {/* Cancel and Create buttons */}
        <Stack direction="row" justify="flex-end" marginTop={5}>
          <Button
            colorScheme="teal"
            disabled={isLoading}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            variant="outline"
            onClick={() => setPage(2)}
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
                    children={pronoun}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="signup-attributes"
                    selected={selectedPronoun === pronoun}
                    onClick={() => setSelectedPronoun(pronoun)}
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
                    children={gender}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="signup-attributes"
                    selected={selectedGender === gender}
                    onClick={() => setSelectedGender(gender)}
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
                    children={sexuality}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="signup-attributes multi-select"
                  />
                ))}
            </ButtonGroup>
          </FormControl>
          <SexualityModal
            alreadySelectedSexualities={selectedSexualities}
            setAlreadySelectedSexualities={setSelectedSexualities}
            sexualities={sexualities}
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
                  // eslint-disable-next-line react/no-array-index-key
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
                  children={interest}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="signup-attributes multi-select"
                />
              ))}
          </ButtonGroup>
          <InterestModal
            alreadySelectedInterests={selectedInterests}
            interestList={interestList}
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
        <Stack direction="row" justify="flex-end" spacing={4}>
          <Button
            colorScheme="teal"
            disabled={isLoading}
            marginTop={5}
            variant="ghost"
            onClick={() => setPage(1)}
          >
            Previous
          </Button>
          <Button
            colorScheme="teal"
            disabled={isLoading}
            marginTop={5}
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            variant="outline"
            onClick={() => handleSubmit()}
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
