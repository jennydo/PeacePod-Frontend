import axios from 'axios';
import { useContext, useEffect } from "react";
import { CloudinaryContext } from '../../../context/CloudinaryContext';
import { Grid, GridItem, Box, Image } from "@chakra-ui/react";

const BackgroundList = () => {
    const {images, dispatch, displayedImage} = useContext(CloudinaryContext);

    useEffect(() => {
        axios.get('http://localhost:4000/api/cloudinary')
        .then(res => {
            dispatch({ type: 'GET_IMAGES', payload: res.data})
        }).catch(err => console.log(err))
    }, [dispatch])

    const chooseImage = (image) => {
        console.log(image)
        dispatch({ type: 'DISPLAY_IMAGE', payload: image})
    }

    return ( 
    <>
        <Box h="75%" overflowY={"auto"}>
            <Grid gridTemplateColumns={'50% 50%'} gap={3} mr={10} >
            {images && images.map((image, idx) => (
                <GridItem 
                    key={idx} onClick={() => chooseImage(image)}
                    style={displayedImage === image ? { border: '2px solid red' } : {}}
                >
                    <Image src={image} style={{ height: 100, width: 300, borderRadius: 10 }}/>
                </GridItem>
            ))}
            </Grid>
        </Box>
    </> );
}
 
export default BackgroundList;