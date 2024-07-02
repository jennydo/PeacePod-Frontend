import { Box, HStack, Image, Text, VStack} from "@chakra-ui/react";

const TrackSearchResult = ({track, chooseTrack}) => {
    const handlePlay = () => {
        chooseTrack(track);
      };
    
    return (
    <Box
        alignItems="center"            
        cursor="pointer" 
        d="flex"               
        m={2}    
        onClick={handlePlay}
    >
        <HStack>
            <Image h={10} src={track.albumUrl} w={10}/>
            <VStack align="left" spacing={1.5}>
                <Text m={-1}>{track.title}</Text>
                <Text className="text-muted" m={-1}>{track.artist}</Text>
            </VStack>
        </HStack>
        
    </Box>
    );
};
 
export default TrackSearchResult;