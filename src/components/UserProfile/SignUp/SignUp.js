import React, { useState } from "react";
import SexualityModal from "./SexualityModal.js";
import { pronouns, genders, sexualities, countries, interestList } from "./userConstants.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
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
    Grid,
    Image,
    Divider,
    Textarea,
    Select
} from "@chakra-ui/react";
import InterestModal from "./InterestModal.js";

const SignUp = () => {
    const [username, setUsername] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")
    const [showPw, setShowPw] = React.useState(false)
    const handleClickPassword = () => setShowPw(!showPw)

    const [showRetypePw, setShowRetypePw] = React.useState(false)
    const handleClickPasswordReType = () => setShowRetypePw(!showRetypePw)

    const [selectedPronoun, setSelectedPronoun] = useState(null);

    const [selectedGender, setSelectedGender] = useState(null);
    const [showGender, setShowGender] = useState(false);

    const [selectedSexualities, setSelectedSexualities] = useState([]);
    const [showSexuality, setShowSexuality] = useState(false);

    const [location, setLocation] = useState(null);

    const [selectedInterests, setSelectedInterests] = useState([]);

    const [bio, setBio] = useState("");

    const handleSubmit = () => {
        const newUser = {
            username,
            password,
            email,
            pronounce: selectedPronoun,
            gender: selectedGender,
            sexualOrientation: selectedSexualities,
            location,
            interests: selectedInterests,
            bio
        }

        // console.log(newUser);
        axios.post("http://localhost:4000/api/users/signUp", newUser)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Container className="signup-page">
            <Stack>
                <Grid templateColumns="70% 30%" gap={15}>
                    <Stack>
                        {/* Username, Email */}
                        <Stack className="username">
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input 
                                    placeholder='Username' 
                                    onChange={(e) => setUsername(e.target.value)} />
                            </FormControl>
                        </Stack>
                        <Stack className="email">
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                        </Stack>

                        {/* Password */}
                        <Stack className="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={showPw ? 'text' : 'password'}
                                    placeholder='Enter password' 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClickPassword}>
                                        {showPw ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Stack>

                        <Stack className="password">
                            <FormLabel>Re-type Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={showRetypePw ? 'text' : 'password'}
                                    placeholder='Re-type password'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClickPasswordReType}>
                                        {showRetypePw ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Stack>
                    </Stack>

                    <Stack align="center">
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
                    </Stack>

                </Grid>

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

                    <Checkbox 
                        onChange={()=>setShowGender(!showGender)}>
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
                    <Checkbox
                        onChange={() => setShowSexuality(!showSexuality)}
                    >
                        Show sexual orientations on my profile
                    </Checkbox>
                </Stack>


                <Stack>
                    <Heading as="h4" size="sm">
                        Location
                    </Heading>
                    <FormControl>
                        <Select placeholder='Select country'
                            onChange={(e) => setLocation(e.target.value)}>
                            {countries && countries.map((country, index) => 
                                <option key={index}
                                    value={country}>
                                    {country}
                                </option>
                            )}
                        </Select>
                    </FormControl>
                </Stack>

                {/* OPTIONAL FIELDS */}
                <Box position='relative' padding='10'>
                    <Divider />
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        bg='white'
                        px='4'
                        height='100%'
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
                    <Textarea placeholder='Your bio, limited to 100 words or less.' onChange={(e) => setBio(e.target.value)}/>
                </Stack>
                <br />

                {/* Cancel and Create buttons */}
                <Stack direction='row' spacing={4} justify="flex-end">
                    <Button colorScheme='gray' variant='solid'>
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => handleSubmit()}
                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />} 
                        colorScheme='teal' 
                        variant='outline'>
                        Create
                    </Button>
                </Stack>
                <Box w='100%' h="50px"></Box>
            </Stack>
        </Container>
    );
};

export default SignUp;
