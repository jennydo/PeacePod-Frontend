import { Icon, Grid } from "@chakra-ui/react";
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
                <div key={index} className='chat-user-profile-feature' onClick={feature.func}>
                    <Icon  marginRight={'6px'} boxSize={4} as={feature.icon}/>
                    <div>{feature.label}</div>
                </div>
            ))}
        </Grid>
    </div>}

    </> );
}
 
export default UserChatProfileFeature;