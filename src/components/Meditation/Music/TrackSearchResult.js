import { Box, Grid, GridItem, Image, Text, VStack } from "@chakra-ui/react"

const TrackSearchResult = ({ track, chooseTrack }) => {
    const handlePlay = () => {
        chooseTrack(track)
    }

    return (
        <Box
            d="flex"
            alignItems="left"
            m={1}
            cursor="pointer"
            onClick={handlePlay}
            _hover={{ bg: '#fc6bb8', transform: 'translateY(-4px)', boxShadow: 'lg' }}
            transition="all 0.5s"
            borderRadius="lg"
            p={1}
            bg="#fab2d9"
            w="100%"
        >
            <Grid gridTemplateColumns={"15% 1fr"} >
                <GridItem w='100%' h='100%' justifyContent={'center'} display={'flex'}>
                    <Image src={track.albumUrl} h={12} w={12} borderRadius="full" />
                </GridItem>
                <GridItem w='100%' h='100%' align='left' alignItems={'left'}>
                        <VStack align="left" spacing={1.5}>
                            <Box justifyContent="flex-start">
                                <Text w='max-content' textAlign={'left'} fontSize="md" fontWeight="bold" m={-1}>{track.title}</Text>
                            </Box>
                            <Box justifyContent="flex-start">
                                <Text w='max-content'className="text-muted" m={1.5 - 2 - 1} color="gray.600" textAlign="left">{track.artist}</Text>
                            </Box>
                        </VStack>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default TrackSearchResult;