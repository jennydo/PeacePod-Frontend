import React from 'react';
import {
    VStack,
    Image,
    Text,
    Box,
    HStack,
    Grid,
    GridItem
} from '@chakra-ui/react';
import './Profile.css';
import { useAuthContext } from '../../../hooks/useAuthContext';
import AvatarModal from '../Avatar/AvatarModal';
import { useAvatarContext } from '../../../hooks/useAvatarContext';
import {StyledBox} from '../../../styles/components/StyledComponents';

const Profile = () => {
    const { user } = useAuthContext();
    const age = user.age;
    const { username, gender, interests, location, pronounce, sexualOrientation, bio } = user.user;
    const { avatar } = useAvatarContext();

    return (
        <VStack>
            <HStack>
                <h1>User Profile</h1>
            </HStack>

            {avatar &&
                <Image
                    alt="User Profile"
                    borderRadius='full'
                    objectFit='cover'
                    src={avatar}
                />
            }
            <AvatarModal />
            <Text color='black' fontSize='2xl' marginBottom={0}>{username} ({age} years old)</Text>
            <Text fontSize='xl'>{`(${pronounce})`}</Text>

            {/* Gender */}
            <Grid alignItems='center' className='border-20' templateColumns='1fr 2fr'
w='50%'>
                <GridItem h='100%'>
                    <Text alignContent="center" bg='#cbbaff2e' borderRadius='10px 0px 0px 10px'
color='black' fontSize='2xl' margin={0}
padding='5px'>
                        Gender
                    </Text>
                </GridItem>

                <GridItem h='100%'>
                    <Text alignContent="center" bg='#ffcae4' borderRadius='0px 10px 10px 0px'
color='black' fontSize='lg' h='100%'
margin={0} padding='5px'>
                        {gender}
                    </Text>
                </GridItem>
            </Grid>


            {/* Location */}
            <Grid alignItems='center' className='border-20' templateColumns='1fr 2fr'
w='50%' >
                <GridItem h='100%'>
                    <Text alignContent="center" bg='#cbbaff2e' borderRadius='10px 0px 0px 10px'
color='black' fontSize='2xl' margin={0}
padding='5px'>
                        Location
                    </Text>
                </GridItem>

                <GridItem h='100%'>
                    <Text alignContent="center" bg='#ffcae4' borderRadius='0px 10px 10px 0px'
color='black' fontSize='lg' h='100%'
margin={0} padding='5px'>
                        {location}
                    </Text>
                </GridItem>
            </Grid>


            {/* Sexual Orientation */}
            <Box bg='#cbbaff2e' borderRadius='20px' padding='10px'
w='50%'>
                <Text align='left' color='black' fontSize='2xl'>
                    Sexual Orientation
                </Text>
                <HStack>
                    {
                        sexualOrientation.map((sexOr, idx) => (
                            <StyledBox 
                                children={sexOr}
                                // eslint-disable-next-line react/no-array-index-key
                                key={idx}
                                className="signup-attributes"
                            />
                        ))
                    }
                </HStack>
            </Box>

            {/* Hobbies */}
            <Box bg='#cbbaff2e' borderRadius='20px' padding='10px'
w='50%'>
                <Text align='left' color='black' fontSize='2xl'>
                    Hobbies
                </Text>
                <HStack>
                    {
                        interests.map((interest, idx) => (
                            <StyledBox 
                            children={interest}
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx}
                            className="signup-attributes"
                        />
                        ))
                    }
                </HStack>

            </Box>

            {/* Bio */}
            <Box bg='#cbbaff2e' borderRadius='20px' padding='10px'
w='50%'>
                <Text align='left' color='black' fontSize='2xl'>
                    About me
                </Text>
                <Text color='black' fontSize='lg'>
                    {bio}
                </Text>
            </Box>
        </VStack>
    );
};

export default Profile;