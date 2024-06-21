import { Avatar, VStack, Grid, GridItem } from "@chakra-ui/react"
import { useAuthContext } from "../../hooks/useAuthContext";
import './Chat.scss';

const UserChatProfile = ({chat}) => {
  const {user: sender} = useAuthContext()
  // get info of the receiver
  const receiver = chat.users.filter(user => user._id !== sender.user._id);
  const { username, avatar, pronounce, location, interests, bio } = receiver[0];
  const info = [
    {
        title: 'Where I am at?',
        content: location
    }, 
    {
        title: 'Get to know me!',
        content: bio
    }, 
    {
        title: 'Ask me about:',
        content: [...interests]
    }, 
  ];

    return ( 
        <VStack
            padding={4}
            spacing={0}
            align='stretch'
            className="chat-user-profile"
        >
            <Avatar src={avatar} name={username} size='xl' mb={3}/>
            <h3 className="chat-user-profile username">{username}</h3>
            <p>({pronounce})</p>
            <div className="chatbox-divider"></div>
            <Grid>
                {info.map((item, index) => (
                    <GridItem key={index}>
                        <p className="chat-user-profile info-title">{item.title}</p>
                        {item.title === 'Ask me about:'
                        ? <VStack spacing={0}>
                            {item.content.map((content, index) => (
                                <p className="chat-user-profile info-content interests" key={index}>{content}</p>
                            ))}
                        </VStack>
                        : <p className="chat-user-profile info-content">{item.content}</p>}
                        
                    </GridItem>
                ))}
            </Grid>
        </VStack>
     );
}
 
export default UserChatProfile;