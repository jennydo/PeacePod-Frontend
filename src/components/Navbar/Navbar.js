import {Link, useLocation} from 'react-router-dom';
import { useLogOut } from '../../hooks/useLogOut';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Navbar.scss';
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
    const { avatar: avatarContext } = useAvatarContext();
    // const { avatar } = useAvatarContext()
    const location = useLocation();
    const pathname = location.pathname;
    const { notifications, dispatch: chatsDispatch } = useChatsContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logOut } = useLogOut();
    const { isOpen: isOpenNewMatch, onOpen: onOpenNewMatch, onClose: onCloseNewMatch } = useDisclosure();
    const [newMatchUser, setNewMatchUser] = useState(null);

    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        setAvatar(avatarContext);
      }, [avatarContext]);

    const handleLogOut = () => {
        logOut();
        onClose();
    };

    const handleRemoveNotification = (username) => {
        delete notifications[username];
    };

    const seeNewMatch = (notif) => {
        setNewMatchUser(notif);
        onOpenNewMatch();
    };

    const createNewChat = () => {
        axios.post('http://localhost:4000/api/chats/', {
            userId: newMatchUser.id
        },{
            headers: { Authorization: `Bearer ${userAuth.token}` },
        }).then((response) => {
            console.log('responde new chat:', response.data);
            chatsDispatch({
                type: 'CREATE_CHAT',
                payload: response.data
            });
            onCloseNewMatch();
            handleRemoveNotification(newMatchUser.username);
            setNewMatchUser(null);
        });
    };
 
    return ( 
        <nav className="peacepod-navbar">
            <h1 className = "app-name"><Link to="/">PeacePod</Link></h1>
            <div className="links">
                {user && (
                    <HStack>
                        <Link className={`peacepod-navlink ${pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        <Link className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`} to="/newsfeed">NewsFeed</Link>
                        <Link className={`peacepod-navlink ${pathname === "/chat" ? "active" : ""}`} to="/chat">Messages</Link>
                        <Link className={`peacepod-navlink ${pathname === "/meditation" ? "active" : ""}`} to="/meditation">Meditation</Link>
                    
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
                                        // eslint-disable-next-line react/no-array-index-key
                                        <Stack key={idx} direction='row'>
                                            <Avatar name={notif.username} size='sm' src={notif.avatar}/>
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
                        
                        <Menu bg="green">
                            <MenuButton pl={8}>
                                <Avatar name={username} size='md' src={avatar}/>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link className={`peacepod-navlink ${pathname === "/userprofile" ? "active" : ""}`} to="/userprofile">
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
                                <Button mr={3} variant='ghost' onClick={onClose}>Cancel</Button>
                                <Button alignContent="center" colorScheme='blue' mr={3}
onClick={handleLogOut}>
                                Logout
                                </Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <Modal isOpen={isOpenNewMatch} size='md' onClose={onCloseNewMatch}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Hooray! We found you a new chatting partner!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody className='new-matched-user'>
                                {newMatchUser && 
                                <Stack alignItems="start" direction="column">
                                    <Stack direction="row" marginBottom="5px" w="100%">
                                        <Avatar name={newMatchUser.username} size='md' src={newMatchUser.avatar}/>
                                        <span>{newMatchUser.username}</span>
                                    </Stack>
                                    <p><strong>Location:</strong>&nbsp;{newMatchUser.location}</p>
                                    <p><strong>Get to know me:</strong>&nbsp;{newMatchUser.bio}</p>
                                    <p><strong>I like:</strong>&nbsp;{[...newMatchUser.interests].join(', ')}</p>
                                </Stack>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button mr={3} variant='ghost' onClick={onCloseNewMatch}>Cancel</Button>
                                <Button alignContent="center" colorScheme='blue' mr={3}
                                        onClick={createNewChat}>
                                Start chatting!
                                </Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </HStack>
                )}   
                {(!user) && (
                    <HStack>
                        <Link className={`peacepod-navlink ${pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        <Link className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`} to="/login">Login</Link>
                        <Link className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`} to="/signup">Signup</Link>
                    </HStack>
                )}
            </div>
        </nav>
     );
};
 
export default Navbar;