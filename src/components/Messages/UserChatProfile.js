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
            <Avatar className="chat-user-profile avatar" src={avatar} name={username} size='xl' mb={3}/>
            <h3 className="chat-user-profile username">{username}</h3>
            <p>({pronounce})</p>
            <div className="chatbox-divider"></div>
            <Grid>
                {info.map((item, index) => (
                    <GridItem key={index} className="chat-user-profile-info">
                        {item.title === 'Ask me about:'
                        ? <div className="chat-user-profile-info-interests">
                            <span className="chat-user-profile-info-title">{item.title}</span> <span className="chat-user-profile-info-content interests">{item.content.join(', ')}</span>
                        </div>
                        :<>
                            <p className="chat-user-profile-info-title">{item.title}</p>
                            <p className="chat-user-profile-info-content">{item.content}</p>
                        </>}
                        
                    </GridItem>
                ))}
            </Grid>
            <div className="chatbox-divider"></div>
        </VStack>
     );
}
 
export default UserChatProfile;