import { Avatar, VStack, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input, 
    Button
 } from "@chakra-ui/react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import '../Chat.scss';
import { useState } from "react";
import { FaPen, FaMapMarkerAlt } from "react-icons/fa";
import { RiEmotionHappyFill } from "react-icons/ri";
import { IoMdColorPalette } from "react-icons/io";
import UserChatProfileFeature from "./UserChatProfileFeature";
import { MdReport } from "react-icons/md";
import { FaDoorOpen } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import { SiStarship } from "react-icons/si";
import axios from "axios";
import { useChatsContext } from '../../../hooks/useChatsContext';
import { useMessagesContext } from "../../../hooks/useMessagesContext";


const UserChatProfile = ({chat}) => {
    const {user: sender} = useAuthContext();
    // get info of the receiver
    const receiver = chat.users.filter(user => user._id !== sender.user._id);
    const { username, avatar, pronounce, location, interests, bio } = receiver[0];
    const { dispatch } = useChatsContext();
    const { dispatch: messagesDispatch } = useMessagesContext();

    const userInfo = [
        {
            icon: FaMapMarkerAlt,
            label: `I am located in ${location}`,
            func: () => {}
        },
        {
            icon: BsFillPersonFill,
            label: bio,
            func: () => {}
        },
        {
            icon: SiStarship,
            label: `I would love to be asked about: ${[...interests].join(', ')}`,
            func: () => {}
        }
    ];

    const chatAdjustment = [
        {
            icon: FaPen,
            label: 'Change user nickname',
            func: () => onOpenNickname()
        },
        {
            icon: IoMdColorPalette,
            label: 'Change message color',
            func: () => {}
        },
        {
            icon: RiEmotionHappyFill,
            label: 'Set theme expression icon',
            func: () => {}
        }
    ];

    const privacyAndSupport = [
        {
            icon: MdReport,
            label: 'Report',
            func: () => {}
        },
        {
            icon: FaDoorOpen,
            label: 'Leave chat',
            func: () => onOpenDeleteChat()
        }
    ];

    const { isOpen: isOpenNickname, onOpen: onOpenNickname, onClose: onCloseNickname } = useDisclosure();
    const [newNickname, setNewNickname] = useState("");
    const handleSetNewNickname = () => {
        axios.patch('http://localhost:4000/api/chats/rename', {
                chatId: chat._id, 
                chatName: newNickname
            }, {
                headers: { Authorization: `Bearer ${sender.token}` },
            })
            .then((response) => {
                messagesDispatch({
                    type: 'SET_CHAT_NAME', 
                    payload: {
                        chatId: chat._id, 
                        chatName: response.data.chatName
                    }
                });
                console.log('new nickname:',response.data);
            });
        setNewNickname("");
        onCloseNickname();
    };

    const { isOpen: isOpenDeleteChat, onOpen: onOpenDeleteChat, onClose: onCloseDeleteChat } = useDisclosure();
    const handleDeleteChat = () => {
        axios.delete(`http://localhost:4000/api/chats/${chat._id}`, {
                headers: { Authorization: `Bearer ${sender.token}` },
            })
            .then((response) => {
                console.log('remove:', response.data.chat._id);
                dispatch({type: 'DELETE_CHAT', payload: response.data.chat._id});
            });
        onCloseDeleteChat();
    };
  
    return ( 
    <>
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

            <UserChatProfileFeature title="Get to know me" features={userInfo}/>
            <UserChatProfileFeature title="Decorate your Chat box" features={chatAdjustment}/>
            <UserChatProfileFeature title="Privacy & Support" features={privacyAndSupport}/>
            
        </VStack>

        <Modal isOpen={isOpenNickname} onClose={onCloseNickname}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change your partner's nickname</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        value={newNickname}
                        onChange={(event) => setNewNickname(event.target.value)}
                        placeholder='Something that represents them' 
                        size='sm' />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSetNewNickname}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isOpenDeleteChat} onClose={onCloseDeleteChat}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Leave Chat</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p>Are you sure you want to delete this chat? You won't be able to connect back with this user.</p>
                    <Button colorScheme='blue' mr={3} onClick={handleDeleteChat}>
                        Delete
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
     );
};

 
export default UserChatProfile;