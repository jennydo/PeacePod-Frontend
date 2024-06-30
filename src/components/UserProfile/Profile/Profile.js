import React from 'react'
import {
    Center,
    VStack,
    Image,
    Text,
    Box,
    HStack,
    Grid,
    GridItem
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import './Profile.css'
import { useAuthContext } from '../../../hooks/useAuthContext'
import AvatarModal from '../Avatar/AvatarModal'
import { useAvatarContext } from '../../../hooks/useAvatarContext'
import {StyledBox} from '../../../styles/components/StyledComponents'

const Profile = () => {
    const { user } = useAuthContext()
    const age = user.age;
    const { username, gender, interests, location, pronounce, sexualOrientation, bio } = user.user
    const { avatar } = useAvatarContext()

    return (
        <VStack>
            <HStack>
                <h1>User Profile</h1>
            </HStack>

            {avatar &&
                <Image
                    src={avatar}
                    alt="User Profile"
                    borderRadius='full'
                    objectFit='cover'
                />
            }
            <AvatarModal />
            <Text fontSize='2xl' color='black' marginBottom={0}>{username} ({age} years old)</Text>
            <Text fontSize='xl'>{`(${pronounce})`}</Text>

            {/* Gender */}
            <Grid className='border-20' templateColumns='1fr 2fr' w='50%' alignItems='center'>
                <GridItem h='100%'>
                    <Text fontSize='2xl' color='black' margin={0} padding='5px' bg='#cbbaff2e' alignContent={'center'} borderRadius='10px 0px 0px 10px'>
                        Gender
                    </Text>
                </GridItem>

                <GridItem h='100%'>
                    <Text fontSize='lg' color='black' margin={0} padding='5px' bg='#ffcae4' h='100%' alignContent={'center'} borderRadius='0px 10px 10px 0px'>
                        {gender}
                    </Text>
                </GridItem>
            </Grid>


            {/* Location */}
            <Grid className='border-20' templateColumns='1fr 2fr' w='50%' alignItems='center' >
                <GridItem h='100%'>
                    <Text fontSize='2xl' color='black' margin={0} padding='5px' bg='#cbbaff2e' alignContent={'center'} borderRadius='10px 0px 0px 10px'>
                        Location
                    </Text>
                </GridItem>

                <GridItem h='100%'>
                    <Text fontSize='lg' color='black' margin={0} padding='5px' bg='#ffcae4' h='100%' alignContent={'center'} borderRadius='0px 10px 10px 0px'>
                        {location}
                    </Text>
                </GridItem>
            </Grid>


            {/* Sexual Orientation */}
            <Box w='50%' borderRadius='20px' padding='10px' bg='#cbbaff2e'>
                <Text fontSize='2xl' align='left' color='black'>
                    Sexual Orientation
                </Text>
                <HStack>
                    {
                        sexualOrientation.map((sexOr, idx) => (
                            <StyledBox 
                                key={idx}
                                children={sexOr}
                                className="signup-attributes"
                            />
                        ))
                    }
                </HStack>
            </Box>

            {/* Hobbies */}
            <Box w='50%' borderRadius='20px' padding='10px' bg='#cbbaff2e'>
                <Text fontSize='2xl' align='left' color='black'>
                    Hobbies
                </Text>
                <HStack>
                    {
                        interests.map((interest, idx) => (
                            <StyledBox 
                            key={idx}
                            children={interest}
                            className="signup-attributes"
                        />
                        ))
                    }
                </HStack>

            </Box>

            {/* Bio */}
            <Box w='50%' borderRadius='20px' padding='10px' bg='#cbbaff2e'>
                <Text fontSize='2xl' align='left' color='black'>
                    About me
                </Text>
                <Text fontSize='lg' color='black'>
                    {bio}
                </Text>
            </Box>
        </VStack>
    )
}

export default Profile