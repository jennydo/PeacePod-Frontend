import axios from 'axios';
import { useContext, useEffect } from "react";
import { CloudinaryContext } from '../../../context/CloudinaryContext';
import { Grid, GridItem, Box, Image } from "@chakra-ui/react";
import { useAuthContext } from '../../../hooks/useAuthContext';

const BackgroundList = () => {
    const {images, dispatch, displayedImage} = useContext(CloudinaryContext);
    const user = useAuthContext();
    const userId = user.user.user._id;
    // console.log('from background list', user.user.user._id)

    useEffect(() => {
        axios.get('http://localhost:4000/api/cloudinary')
        .then(res => {
            dispatch({ type: 'GET_IMAGES', payload: res.data})
        }).catch(err => console.log(err))

        axios.get(`http://localhost:4000/api/users/findUser/${userId}`)
        .then(res => {
            dispatch({ type: 'GET_USER_IMAGES', payload: res.data.user.uploadedBackgrounds})
            console.log("Response ", res.data.user.uploadedBackgrounds)
        })
        .catch(err => console.log("Error while getting user images", err))
    }, [])

    const chooseImage = (image) => {
        console.log(image)
        dispatch({ type: 'DISPLAY_IMAGE', payload: image})
    }

    return ( 
    <>
        <Box h="100%" w={"100%"} overflowY={"auto"} objectFit={true} >
            <Grid gridTemplateColumns={'50% 50%'} gap={1} maxW={'98%'}>
            {images && images.map((image, idx) => (
                <GridItem 
                    key={idx} onClick={() => chooseImage(image)}
                >
                    <Image src={image}
                        style={{
                            ...(displayedImage === image && { border: '3px solid red' }), 
                            height: 140, 
                            width: 200, 
                            borderRadius: 10,
                            objectFit: 'cover'
                        }}
                    />
                </GridItem>
            ))}
            </Grid>
        </Box>
    </> );
}
 
export default BackgroundList;