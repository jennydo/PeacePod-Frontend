import React from 'react'
import { 
    Center,
    VStack,
    Circle,
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

const Profile = () => {
    const { user } = useAuthContext()
    const { username, gender, interests, location, pronounce, sexualOrientation, bio } = user.user 
    const { avatar } = useAvatarContext()

    // console.log("avatar", avatar)

    return (
    <VStack>
        <HStack>
            <Center h='75px' fontSize='3xl' color='#98B9F2'>
                <h1>User Profile</h1>
            </Center>   
            <EditIcon w={10} h={10} color='aliceblue'/>                
        </HStack>
        
        {avatar && 
            <Image
                src={avatar}
                alt="User Profile"
                borderRadius='full'
                objectFit='cover'
                />
            }
        <AvatarModal/>
        <Text fontSize='2xl' color='#98B9F2' marginBottom={0}>{username}</Text>
        <Text fontSize='xl'>{`(${pronounce})`}</Text>

        {/* Gender */}
        <Grid className='border-20' templateColumns='1fr 2fr' w='50%' alignItems='center'>
            <GridItem h='100%'>
                <Text fontSize='2xl'  color='#98B9F2' margin={0} padding='5px' bg='aliceblue' alignContent={'center'} borderRadius='10px 0px 0px 10px'>
                    Gender
                </Text>                    
            </GridItem>

            <GridItem h='100%'>
                <Text fontSize='lg' color='black' margin={0} padding='5px' bg='#FFAFCC' h='100%' alignContent={'center'} borderRadius='0px 10px 10px 0px'>
                    {gender}
                </Text>                   
            </GridItem> 
        </Grid>            


        {/* Location */}
        <Grid className='border-20' templateColumns='1fr 2fr' w='50%' alignItems='center' >
            <GridItem h='100%'>
                <Text fontSize='2xl'  color='#98B9F2' margin={0} padding='5px' bg='aliceblue' alignContent={'center'} borderRadius='10px 0px 0px 10px'>
                    Location
                </Text>                    
            </GridItem>

            <GridItem h='100%'>
                <Text fontSize='lg' color='black' margin={0} padding='5px' bg='#FFAFCC' h='100%' alignContent={'center'} borderRadius='0px 10px 10px 0px'>
                    {location}
                </Text>                   
            </GridItem>
        </Grid>           


        {/* Sexual Orientation */}
        <Box w='50%' borderRadius='20px' padding='10px' bg='aliceblue'>
            <Text fontSize='2xl' align='left' color='#98B9F2'>
                Sexual Orientation
            </Text>
            <HStack>
            {
                sexualOrientation.map((sexOr, idx) => (
                    <Box as='button' key={idx} className="interest" borderRadius='md' bg='pink' color='white' px={4} h={8} minWidth='auto'>
                        {sexOr}
                    </Box> 
                ))
            }
            </HStack>
        </Box>

        {/* Hobbies */}
        <Box w='50%' borderRadius='20px' padding='10px' bg='aliceblue'>
            <Text fontSize='2xl' align='left' color='#98B9F2'>
                Hobbies
            </Text>
            <HStack>
            {
                interests.map((interest, idx) => (
                    <Box as='button' key={idx} className="interest" borderRadius='md' bg='pink' color='white' px={4} h={8} minWidth='auto'>
                        {interest}
                    </Box> 
                ))
            }
            </HStack>

        </Box>
        
        {/* Bio */}
        <Box w='50%'borderRadius='20px' padding='10px' bg='aliceblue'>
            <Text fontSize='2xl' align='left' color='#98B9F2'>
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