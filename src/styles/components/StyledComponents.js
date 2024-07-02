import { Box, Button } from "@chakra-ui/react";
import './StyledComponents.scss';

const StyledDivider = ({direction}) => {
    return ( 
    <div 
        className={`styled-divider ${direction === 'vertical' ? 'vertical' : 'horizontal'}`} /> 
    );
};

const StyledButton = ({text, onClick=() => {}, icon=null, width=null}) => {
    return (
        <Button 
            _active={{ bg: '#d0aadf' }}
            _hover={{ bg: '#e0bff2' }}
            bg="#f0d4ff"
            color="black"
            leftIcon={icon}
            w={width}
            onClick={onClick}
        >
            {text}
        </Button>    
    );
};

const StyledBox = ({ onClick=() => {}, children=null, selected=false, className=""}) => {
    return (
    <Box 
        borderRadius={5}
        className={`${className} ${selected ? "styled-box-selected" : ""}`}
        h='100%' 
        p={2} 
        w='100%'
        onClick={onClick}>
        {children}
    </Box>
    );
};
 
export { StyledDivider, StyledButton, StyledBox };
