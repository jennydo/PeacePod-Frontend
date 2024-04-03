import React, { useState } from 'react';
import SexualityModal from './SexualityModal.js';
import { Container, Button, ButtonGroup, Checkbox, Box, Heading, Stack } from '@chakra-ui/react';
import InterestModal from './InterestModal.js';

const SignUp = () => {
    
    const [selectedPronoun, setSelectedPronoun] = useState(null);
    const handlePronounSelected = (choice) => {
        setSelectedPronoun(choice);
    }

    const [selectedGender, setSelectedGender] = useState(null);
    const handleGenderSelected = (choice) => {
        setSelectedGender(choice);
    }

    const [showGender, setShowGender] = useState(false);
    const handleShowGenderChange = () => {
        setShowGender(!showGender);
    }

    const sexualities = ["Straight", "Gay", "Lesbian", "Bisexual", "Asexual", "Demisexual", "Queer", "Skoliosexual", "Fluid", "Questioning", "Other"]
    const [selectedSexualities, setSelectedSexualities] = useState([]);
    const [showSexuality, setShowSexuality] = useState(false);
    const handleShowSexualityChange = () => {
        setShowSexuality(!showSexuality);
    }

    const [selectedInterests, setSelectedInterests] = useState([]);
    const interestList = [
        "Cooking", "Traveling", "Reading", "Hiking", "Photography", "Painting", "Music",
        "Dancing", "Yoga", "Gardening", "Writing", "Coding", "Gaming", "Watching movies",
        "Woodworking", "Fashion design", "DIY crafts", "Learning languages", "Exercising",
        "Running", "Swimming", "Fishing", "Bird watching", "Skydiving", "Scuba diving",
        "Rock climbing", "Skiing", "Surfing", "Camping", "Playing musical instruments",
        "Volunteering", "Astrology", "Chess", "Board games", "Mixology", "Wine tasting",
        "Coffee brewing", "Travelling", "Urban exploration", "Stargazing", "Reading fiction",
        "Reading non-fiction", "Card games", "Table tennis", "Sudoku", "Crossword puzzles",
        "Sketching", "Origami", "Comic books", "Graphic novels", "Horror movies", "Documentaries",
        "Podcasting", "Collecting vinyl records", "Metal detecting", "Tattooing", "Bodybuilding",
        "Weightlifting", "Cycling", "Triathlon", "Archery", "Sailing", "Kayaking", "Paragliding",
        "Bungee jumping", "Zip-lining", "Mountaineering", "Base jumping", "Whitewater rafting",
        "Surfing", "Kiteboarding", "Wakeboarding", "Jet skiing", "Canyoning", "Ziplining",
        "Rollerblading", "Ice skating", "Skateboarding", "Slacklining", "Escape rooms",
        "Virtual reality gaming", "Paintballing", "Laser tag", "Go-karting", "Shooting range",
        "Archery tag", "Horseback riding", "Wildlife photography", "Zoology", "Meteorology",
        "Astronomy", "Astrophotography", "Geocaching", "Exploring abandoned places", "Ghost hunting",
        "Mythology", "Magic tricks", "Poker", "Billiards", "Bowling", "Golf", "Tennis", "Badminton",
        "Volleyball", "Basketball", "Football", "Soccer", "Rugby", "Cricket", "Baseball", "Hockey",
        "Boxing", "Martial arts", "Jiu-jitsu", "Wrestling", "Fencing", "Kickboxing", "Muay Thai",
        "Gymnastics", "Crossfit", "Calisthenics", "Mountain biking", "Trail running", "Ultra running",
        "Open water swimming", "Diving", "Skateboarding", "Snowboarding", "Skiing", "Caving",
        "Backpacking", "Survivalism", "Bushwalking", "Orienteering", "Stargazing", "Amateur radio",
        "Model building", "Drone flying", "Metal detecting", "Foraging", "Mushroom hunting",
        "Plant identification", "Gardening"
    ];
    
    return ( 
        <Container className="signup-page">
            <Stack>
                {/* CHOOSE PRONOUN */}
                <Stack className="pronouns">
                    <Heading as='h4' size='sm'>Pronouns: </Heading>
                    <ButtonGroup variant='solid'>
                        <Button
                            className="pronoun-option"
                            colorScheme={selectedPronoun === "he/him" ? "blue" : "gray"}
                            onClick={() => handlePronounSelected("he/him")}
                            borderRadius='100px'>
                            He/Him
                        </Button>
                        <Button
                            className="pronoun-option"
                            colorScheme={selectedPronoun === "she/her" ? "blue" : "gray"}
                            onClick={() => handlePronounSelected("she/her")}
                            borderRadius='100px'>
                            She/Her
                        </Button>
                        <Button
                            className="pronoun-option"
                            colorScheme={selectedPronoun === "they/them" ? "blue" : "gray"}
                            onClick={() => handlePronounSelected("they/them")}
                            borderRadius='100px'>
                            They/Them
                        </Button>
                        <Button
                            className="pronoun-option"
                            colorScheme={selectedPronoun === "other" ? "blue" : "gray"}
                            onClick={() => handlePronounSelected("other")}
                            borderRadius='100px'>
                            Other
                        </Button>
                    </ButtonGroup>
                </Stack>

                {/* CHOOSE GENDER */}
                <Stack className="genders">
                    <Heading as='h4' size='sm'>Gender: </Heading>
                    <ButtonGroup variant='solid'>
                        <Button
                            className="gender-option"
                            colorScheme={selectedGender === "man" ? "blue" : "gray"}
                            onClick={() => handleGenderSelected("man")}
                            borderRadius='100px'>
                            Man
                        </Button>
                        <Button
                            className="gender-option"
                            colorScheme={selectedGender === "woman" ? "blue" : "gray"}
                            onClick={() => handleGenderSelected("woman")}
                            borderRadius='100px'>
                            Woman
                        </Button>
                        <Button
                            className="gender-option"
                            colorScheme={selectedGender === "nonbinary" ? "blue" : "gray"}
                            onClick={() => handleGenderSelected("nonbinary")}
                            borderRadius='100px'>
                            Nonbinary
                        </Button>
                        <Button
                            className="gender-option"
                            colorScheme={selectedGender === "other" ? "blue" : "gray"}
                            onClick={() => handleGenderSelected("other")}
                            borderRadius='100px'>
                            Other
                        </Button>
                    </ButtonGroup>
                    <Checkbox checked={showGender} onChange={handleShowGenderChange}>Show gender on my profile</Checkbox>
                </Stack>

                {/* CHOOSE SEXUAL ORIENTATION */}
                <Stack className="sexualities">
                    <Heading as='h4' size='sm'>Sexual Orientations: </Heading>
                    <Stack direction={['column', 'row']} spacing='5px' wrap='wrap'>
                        {selectedSexualities && selectedSexualities.map((sexuality, index) => (
                            <Box as='button' key={index} className="sexualities" borderRadius='md' bg='pink' color='white' px={4} h={8} minWidth='auto'>
                                {sexuality}
                            </Box>
                        ))}
                    </Stack>
                    <SexualityModal
                        sexualities = {sexualities}
                        alreadySelectedSexualities = {selectedSexualities}
                        setAlreadySelectedSexualities = {setSelectedSexualities}
                        />
                    <Checkbox checked={showSexuality} onChange={handleShowSexualityChange}>Show sexual orientations on my profile</Checkbox>
                </Stack>

                {/* CHOOSE INTERESTS */}
                <Stack className="interests">
                    <Heading as='h4' size='sm'>Interests: </Heading>
                    <Stack direction={['column', 'row']} spacing='5px' wrap='wrap'>
                        {selectedInterests && selectedInterests.map((interest, index) => (
                            <Box as='button' key={index} className="interests" borderRadius='md' bg='pink' color='white' px={4} h={8} minWidth='auto'>
                                {interest}
                            </Box>
                        ))}
                    </Stack>
                    <InterestModal 
                        interestList={interestList} 
                        alreadySelectedInterests={selectedInterests} 
                        setAlreadySelectedInterests={setSelectedInterests}/>
                </Stack>
            </Stack>
        </Container>

     );
}
 
export default SignUp;



