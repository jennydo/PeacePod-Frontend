import { Avatar, VStack } from "@chakra-ui/react"
import { useAuthContext } from "../../hooks/useAuthContext";
import './Chat.scss';

const UserChatProfile = ({chat}) => {
  const {user: sender} = useAuthContext()
  // get info of the receiver
  const receiver = chat.users.filter(user => user._id !== sender.user._id);
  const { username, avatar, pronounce, location, interests, bio } = receiver[0];

    return ( 
        <VStack
            spacing={4}
            align='stretch'
            className="chat-user-profile"
        >
            <Avatar src={avatar} name={username} size='xl'/>
            <h3>{username}</h3>
            <p>({pronounce})</p>
            <p>{location}</p>
            <p>{interests}</p>
            <p>{bio}</p>
        </VStack>
     );
}
 
export default UserChatProfile;