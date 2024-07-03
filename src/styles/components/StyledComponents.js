import { Box, Button, IconButton } from "@chakra-ui/react";
import './StyledComponents.scss';

const StyledDivider = ({direction}) => {
    return ( 
    <div 
        className={`styled-divider ${direction === 'vertical' ? 'vertical' : 'horizontal'}`}>
    </div> 
    );
}

const StyledButton = ({text, onClick=() => {}, icon=null, width=null}) => {
    return (
        <Button 
            onClick={onClick}
            bg="#f0d4ff"
            color="black"
            _hover={{ bg: '#e0bff2' }}
            _active={{ bg: '#d0aadf' }}
            leftIcon={icon}
            w={width}
            borderRadius="20px"
            px={8}
        >
            {text}
        </Button>    
    );
}

const StyledBox = ({ onClick=() => {}, children=null, selected=false, className=""}) => {
    return (
    <Box 
        w='100%'
        h='100%'
        p={2} 
        borderRadius={10} 
        className={`${className} ${selected ? "styled-box-selected" : ""}`}
        onClick={onClick}>
        {children}
    </Box>
    )
}
 
export { StyledDivider, StyledButton, StyledBox };