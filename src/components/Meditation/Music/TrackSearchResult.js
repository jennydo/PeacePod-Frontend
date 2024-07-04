
import { Box, Image, Text, VStack } from "@chakra-ui/react";

const TrackSearchResult = ({ track, chooseTrack }) => {
    const handlePlay = () => {
        chooseTrack(track);
    };

    return (
        <Box
            _hover={{ bg: '#fc6bb8', transform: 'translateY(-4px)', boxShadow: 'lg' }}
            alignItems="left"
            bg="#fab2d9"
            borderRadius="lg"
            cursor="pointer"
            d="flex"
            m={1}
            p={1}
            transition="all 0.5s"
            w="100%"
            onClick={handlePlay}
        >
            <Grid gridTemplateColumns="15% 1fr" >
                <GridItem display="flex" h='100%' justifyContent="center"
w='100%'>
                    <Image borderRadius="full" h={12} src={track.albumUrl}
w={12} />
                </GridItem>
                <GridItem align='left' alignItems="left" h='100%'
w='100%'>
                        <VStack align="left" spacing={1.5}>
                            <Box justifyContent="flex-start">
                                <Text fontSize="md" fontWeight="bold" m={-1}
textAlign="left" w='max-content'>{track.title}</Text>
                            </Box>
                            <Box justifyContent="flex-start">
                                <Text className="text-muted" color="gray.600" m={1.5 - 2 - 1}
textAlign="left" w='max-content'>{track.artist}</Text>
                            </Box>
                        </VStack>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default TrackSearchResult;