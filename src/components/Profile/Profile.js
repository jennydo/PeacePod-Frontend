import React from 'react'
import { 
    Center,
    VStack,
    Circle,
    Image,
    Text,
    Box,
    HStack,
    Grid
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

const Profile = () => {

    const interests = [
        'Chess',
        'Boardgames',
        'Catan',
        'Reality shows'
    ]

    return (
    <VStack>
        <HStack>
            <Center h='75px' fontSize='3xl' color='#98B9F2'>
                User Profile
            </Center>   
            <EditIcon w={10} h={10} color='aliceblue'/>                
        </HStack>
 
        <Circle>
            <Image 
                src='https://res.cloudinary.com/khoa165/image/upload/q_100/v1577895922/portfolio/avatar.jpg' 
                alt='klt'
                borderRadius='full'
                boxSize='200px'
                objectFit='cover'
            />
        </Circle>
        <Text fontSize='2xl' color='#98B9F2'>Ke Huy Diet Catan</Text>
        {/* Pronouns */}
        <Grid templateColumns='1fr 2fr' bg='green' w='50%'>
            <Text fontSize='2xl' alignItems={'center'} color='#98B9F2' margin={0} padding='5px' bg='aliceblue'>
                Pronouns
            </Text>    
            <Text fontSize='lg' color='black' margin={0} padding='5px' bg='#FFAFCC'>
                he/him/his
            </Text>                 
        </Grid>

        {/* Gender */}
        <Grid templateColumns='1fr 2fr' bg='green' w='50%'>
            <Text fontSize='2xl' alignItems={'center'} color='#98B9F2' margin={0} padding='5px' bg='aliceblue'>
                Gender
            </Text>    
            <Text fontSize='lg' color='black' margin={0} padding='5px' bg='#FFAFCC'>
                Man
            </Text>   
        </Grid>

        {/* Sexual Orientation */}
        <Box w='50%' borderRadius='20px' padding='10px' bg='aliceblue'>
            <Text fontSize='2xl' align='left' color='#98B9F2'>
                Sexual Orientation
            </Text>
            <Text fontSize='lg' color='black'>
                Straight
            </Text>   
        </Box>

        {/* Location */}
        <Box w='50%' borderRadius='20px' padding='10px' bg='aliceblue'>
            <Text fontSize='2xl' align='left' color='#98B9F2' w='50%'>
                Location
            </Text>
            <Text fontSize='lg' color='black'>
                Lawrenceville, Georgia, United States
            </Text>   
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
                A low-key Catan prodigy who is feeling isolated and longing for a worthy challenger.
            </Text>          
        </Box>

    </VStack>
    )
}

export default Profile