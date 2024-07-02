import { Icon, Grid, Box } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const UserChatProfileFeature = ({title, features}) => {
    const [isOpen, setIsOpen] = useState(false);

    return ( 
    <>
    <div className='chat-user-profile feature' onClick={()=> setIsOpen(!isOpen)}>
        <p className="chat-user-profile feature label">{title}</p> 
        <Icon as={isOpen ? IoIosArrowUp : IoIosArrowDown}/> 
    </div>

    {isOpen && 
    <div style={{width: '100%'}}>
        <Grid w="100%">
            {features.map((feature, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Box key={index} className='chat-user-profile-feature' onClick={feature.func}>
                    <Icon  as={feature.icon} boxSize={4} marginRight="6px"/>
                    <div>{feature.label}</div>
                </Box>
            ))}
        </Grid>
    </div>}

    </> );
};
 
export default UserChatProfileFeature;