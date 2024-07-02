import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react"

const TrackSearchResult = ({ track, chooseTrack }) => {
    const handlePlay = () => {
        chooseTrack(track)
    }

    return (
        <Box
            d="flex"
            alignItems="left"
            m={2}
            cursor="pointer"
            onClick={handlePlay}
            _hover={{ bg: 'gray.100', transform: 'translateY(-4px)', boxShadow: 'lg' }}
            transition="all 0.5s"
            borderRadius="lg"
            p={4}
            bg="#FFB6C1"
        >
            <HStack>
                <Image src={track.albumUrl} h={12} w={12} borderRadius="full" />
                <VStack align="left" spacing={1.5}>
                    <Text fontSize="md" fontWeight="bold" m={-1}>{track.title}</Text>
                    <Text className="text-muted" m={1.5 - 2 - 1} color="gray.600" textAlign="left">{track.artist}</Text>
                </VStack>
            </HStack>
        </Box>
    )
}

export default TrackSearchResult;