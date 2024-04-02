import React from 'react'
import { 
    Center,
    VStack,
    Circle,
    Image,
    Text
} from '@chakra-ui/react'

const Profile = () => {
  return (
    <VStack>
        <Center>
            <Text fontSize='3xl'>User Profile</Text>
        </Center>        
        <Circle>
            <Image 
                src='https://res.cloudinary.com/khoa165/image/upload/q_100/v1577895922/portfolio/avatar.jpg' 
                alt='klt'
                borderRadius='full'
                boxSize='200px'
                objectFit='cover'
            />
        </Circle>
        <Text fontSize='2xl'>Catan</Text>
    </VStack>

  )
}

export default Profile