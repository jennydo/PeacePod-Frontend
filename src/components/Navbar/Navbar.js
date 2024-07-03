import {Link, useLocation} from 'react-router-dom';
import { useLogOut } from '../../hooks/useLogOut';
import { useAuthContext } from '../../hooks/useAuthContext'
import './Navbar.scss'
import { Avatar, Menu, MenuButton, MenuItem, MenuList, MenuDivider, 
    useDisclosure, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    HStack, 
    Icon,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Stack,
} from '@chakra-ui/react';
import { useAvatarContext } from '../../hooks/useAvatarContext';
import { useEffect, useState } from 'react';
import { IoNotifications } from "react-icons/io5";
import { useChatsContext } from '../../hooks/useChatsContext';
import axios from 'axios';

const Navbar = () => {
    const { user: userAuth } = useAuthContext();
    const { user } = useAuthContext()?.user || {};
    // const { username, avatar } = user || {};
    const { username } = user || {};
    const { avatar: avatarContext } = useAvatarContext()
    // const { avatar } = useAvatarContext()
    const location = useLocation();
    const pathname = location.pathname;
    const { notifications, dispatch: chatsDispatch } = useChatsContext();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { logOut } = useLogOut();
    const { isOpen: isOpenNewMatch, onOpen: onOpenNewMatch, onClose: onCloseNewMatch } = useDisclosure()
    const [newMatchUser, setNewMatchUser] = useState(null);

    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        setAvatar(avatarContext);
        // console.log("Changing avatar because of avatarContext...")
      }, [avatarContext]);

    const handleLogOut = () => {
        logOut()
        onClose()
    }

    const handleRemoveNotification = (username) => {
        delete notifications[username]
    }

    const seeNewMatch = (notif) => {
        setNewMatchUser(notif)
        console.log("New match user here: " + notif)
        console.log("New match user here: " + newMatchUser)
        onOpenNewMatch()
    }

    const createNewChat = () => {
        console.log("Creating new chat");

        console.log('user token to create new chat', userAuth.token)
        console.log('newMatch user', newMatchUser)
        console.log('newMatch user id', newMatchUser.id)
        
        axios.post('http://localhost:4000/api/chats/', {
            userId: newMatchUser.id
        },{
            headers: { Authorization: `Bearer ${userAuth.token}` },
        }).then((response) => {
            console.log('responde new chat:', response.data)
            chatsDispatch({
                type: 'CREATE_CHAT',
                payload: response.data
            });
            onCloseNewMatch();
        })
    }
 
    return ( 
        <nav className="peacepod-navbar">
            <h1 className = "app-name"><Link to="/">PeacePod</Link></h1>
            <div className="links">
                {user && (
                    <HStack>
                        <Link to="/" className={`peacepod-navlink ${pathname === "/" ? "active" : ""}`}>Home</Link>
                        <Link to="/newsfeed" className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`}>NewsFeed</Link>
                        <Link to="/chat" className={`peacepod-navlink ${pathname === "/chat" ? "active" : ""}`}>Messages</Link>
                        <Link to="/meditation" className={`peacepod-navlink ${pathname === "/meditation" ? "active" : ""}`}>Meditation</Link>
                    
                        <Popover placement='bottom-end'>
                            <PopoverTrigger>
                            <IconButton
                                icon={<Icon as={IoNotifications} boxSize={6}/>}
                                isRound={true}
                                ml="16px"
                            />
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>New Messages</PopoverHeader>
                                <PopoverBody>
                                    {!Object.keys(notifications).length && <p>No new message.</p>}
                                    {notifications && Object.values(notifications).map((notif, idx) => (
                                        <Stack key={idx} direction={'row'}>
                                            <Avatar size='sm' name={notif.username} src={notif.avatar}/>
                                            <Link to="/chat" onClick={
                                                    (notif.type === 'new message') 
                                                    ? () => handleRemoveNotification(notif.username)
                                                    : () => seeNewMatch(notif)
                                                }>
                                                <p className='notification-content'>
                                                   {(notif.type === 'new message') && `New message from ${notif.username}`}
                                                   {(notif.type === 'new match') && `You have a new match with ${notif.username}!!!`}
                                                </p>
                                            </Link>  
                                        </Stack>
                                    ))}
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                        
                        <Menu bg={"green"}>
                            <MenuButton pl={8}>
                                <Avatar name={username} src={avatar} size='md'/>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link to="/userprofile" className={`peacepod-navlink ${pathname === "/userprofile" ? "active" : ""}`}>
                                        My Profile
                                    </Link>
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem>
                                    <button onClick={onOpen}>
                                            Logout
                                    </button>
                                </MenuItem>
                            </MenuList>
                        </Menu>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Logout</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Are you sure you want to log out of your account?
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='ghost' onClick={onClose} mr={3}>Cancel</Button>
                                <Button colorScheme='blue' mr={3} onClick={handleLogOut} alignContent={"center"}>
                                Logout
                                </Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <Modal isOpen={isOpenNewMatch} onClose={onCloseNewMatch}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Hooray! We found you a new chatting partner!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {newMatchUser && 
                                <>
                                <Avatar name={newMatchUser.username} src={newMatchUser.avatar} size='md'/>
                                <h2>{newMatchUser.username}</h2>
                                <h4>{newMatchUser.location}</h4>
                                <h4>{newMatchUser.bio}</h4>
                                <h4>{newMatchUser.interests}</h4>
                                </>}
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='ghost' onClick={onCloseNewMatch} mr={3}>Cancel</Button>
                                <Button colorScheme='blue' mr={3} onClick={createNewChat} alignContent={"center"}>
                                Start chatting!
                                </Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </HStack>
                )}   
                {(!user) && (
                    <HStack>
                        <Link to="/" className={`peacepod-navlink ${pathname === "/" ? "active" : ""}`}>Home</Link>
                        <Link to="/login" className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`}>Login</Link>
                        <Link to="/signup" className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`}>Signup</Link>
                    </HStack>
                )}
            </div>
        </nav>
     );
}
 
export default Navbar;