import { Box, HStack, Image, Text, VStack} from "@chakra-ui/react"

const TrackSearchResult = ({track, chooseTrack}) => {
    const handlePlay = () => {
        chooseTrack(track)
      }
    
    return (
    <Box
        d="flex"            
        alignItems="center" 
        m={2}               
        cursor="pointer"    
        onClick={handlePlay}
    >
        <HStack>
            <Image src={track.albumUrl} h={10} w={10}/>
            <VStack align="left" spacing={1.5}>
                <Text m={-1}>{track.title}</Text>
                <Text className="text-muted" m={-1}>{track.artist}</Text>
            </VStack>
        </HStack>
        
    </Box>
    )
}
 
export default TrackSearchResult;