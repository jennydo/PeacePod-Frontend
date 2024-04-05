import React, { useState } from "react";
import SexualityModal from "./SexualityModal.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
    const pronouns = ["She/Her", "He/Him", "They/Them", "Other"];
    const [selectedPronoun, setSelectedPronoun] = useState(null);
    const handlePronounSelected = (choice) => {
        setSelectedPronoun(choice);
    };

    const genders = ["Woman", "Man", "Nonbinary", "Other"];
    const [selectedGender, setSelectedGender] = useState(null);
    const handleGenderSelected = (choice) => {
        setSelectedGender(choice);
    };
    const [showGender, setShowGender] = useState(false);
    const handleShowGenderChange = () => {
        setShowGender(!showGender);
    };

    const sexualities = [
        "Straight",
        "Gay",
        "Lesbian",
        "Bisexual",
        "Asexual",
        "Demisexual",
        "Queer",
        "Skoliosexual",
        "Fluid",
        "Questioning",
        "Other",
    ];
    const [selectedSexualities, setSelectedSexualities] = useState([]);
    const [showSexuality, setShowSexuality] = useState(false);
    const handleShowSexualityChange = () => {
        setShowSexuality(!showSexuality);
    };

    const [selectedInterests, setSelectedInterests] = useState([]);
    const interestList = [
        "Cooking",
        "Traveling",
        "Reading",
        "Hiking",
        "Photography",
        "Painting",
        "Music",
        "Dancing",
        "Yoga",
        "Gardening",
        "Writing",
        "Coding",
        "Gaming",
        "Watching movies",
        "Woodworking",
        "Fashion design",
        "DIY crafts",
        "Learning languages",
        "Exercising",
        "Running",
        "Swimming",
        "Fishing",
        "Bird watching",
        "Skydiving",
        "Scuba diving",
        "Rock climbing",
        "Skiing",
        "Surfing",
        "Camping",
        "Playing musical instruments",
        "Volunteering",
        "Astrology",
        "Chess",
        "Board games",
        "Mixology",
        "Wine tasting",
        "Coffee brewing",
        "Travelling",
        "Urban exploration",
        "Stargazing",
        "Reading fiction",
        "Reading non-fiction",
        "Card games",
        "Table tennis",
        "Sudoku",
        "Crossword puzzles",
        "Sketching",
        "Origami",
        "Comic books",
        "Graphic novels",
        "Horror movies",
        "Documentaries",
        "Podcasting",
        "Collecting vinyl records",
        "Metal detecting",
        "Tattooing",
        "Bodybuilding",
        "Weightlifting",
        "Cycling",
        "Triathlon",
        "Archery",
        "Sailing",
        "Kayaking",
        "Paragliding",
        "Bungee jumping",
        "Zip-lining",
        "Mountaineering",
        "Base jumping",
        "Whitewater rafting",
        "Surfing",
        "Kiteboarding",
        "Wakeboarding",
        "Jet skiing",
        "Canyoning",
        "Ziplining",
        "Rollerblading",
        "Ice skating",
        "Skateboarding",
        "Slacklining",
        "Escape rooms",
        "Virtual reality gaming",
        "Paintballing",
        "Laser tag",
        "Go-karting",
        "Shooting range",
        "Archery tag",
        "Horseback riding",
        "Wildlife photography",
        "Zoology",
        "Meteorology",
        "Astronomy",
        "Astrophotography",
        "Geocaching",
        "Exploring abandoned places",
        "Ghost hunting",
        "Mythology",
        "Magic tricks",
        "Poker",
        "Billiards",
        "Bowling",
        "Golf",
        "Tennis",
        "Badminton",
        "Volleyball",
        "Basketball",
        "Football",
        "Soccer",
        "Rugby",
        "Cricket",
        "Baseball",
        "Hockey",
        "Boxing",
        "Martial arts",
        "Jiu-jitsu",
        "Wrestling",
        "Fencing",
        "Kickboxing",
        "Muay Thai",
        "Gymnastics",
        "Crossfit",
        "Calisthenics",
        "Mountain biking",
        "Trail running",
        "Ultra running",
        "Open water swimming",
        "Diving",
        "Skateboarding",
        "Snowboarding",
        "Skiing",
        "Caving",
        "Backpacking",
        "Survivalism",
        "Bushwalking",
        "Orienteering",
        "Stargazing",
        "Amateur radio",
        "Model building",
        "Drone flying",
        "Metal detecting",
        "Foraging",
        "Mushroom hunting",
        "Plant identification",
        "Gardening",
    ];

    // const countryOptions = [
    //     { value: 'united-arab-emirates', label: 'United Arab Emirates' },
    //     { value: 'nigeria', label: 'Nigeria' },
    //     // Add more countries as needed
    // ];

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Container className="signup-page">
            <Stack>
                <Grid templateColumns="70% 30%" gap={15}>
                    {/* Username, Email */}
                    <Stack>
                        <Stack className="username">
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input placeholder='Username' />
                            </FormControl>
                        </Stack>
                        <Stack className="email">
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder='Email' />
                            </FormControl>
                        </Stack>
                        {/* Password */}
                        <Stack className="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Stack>
                        <Stack className="password">
                        <FormLabel>Re-type Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Re-type password'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
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
                                    onClick={() => handlePronounSelected(pronoun)}
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
                                    onClick={() => handleGenderSelected(gender)}
                                    borderRadius="100px"
                                >
                                    {gender}
                                </Button>
                            ))}
                    </ButtonGroup>

                    <Checkbox checked={showGender} onChange={handleShowGenderChange}>
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
                        checked={showSexuality}
                        onChange={handleShowSexualityChange}
                    >
                        Show sexual orientations on my profile
                    </Checkbox>
                </Stack>


                <Stack>
                    <Heading as="h4" size="sm">
                        Location
                    </Heading>
                    <FormControl>
                        <Select placeholder='Select country'>
                            <option>
                                Test
                            </option>
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
                    <Textarea placeholder='Your bio, limited to 100 words or less.' />
                </Stack>
                <br/>
                
                {/* Cancel and Create buttons */}
                <Stack direction='row' spacing={4} justify="flex-end">
                    <Button colorScheme='gray' variant='solid'>
                        Cancel
                    </Button>
                    <Button rightIcon={<FontAwesomeIcon icon={faArrowRight} />} colorScheme='teal' variant='outline'>
                        Create
                    </Button>
                </Stack>
                <Box w='100%' h="50px"></Box>
            </Stack>
        </Container>
    );
};

export default SignUp;
