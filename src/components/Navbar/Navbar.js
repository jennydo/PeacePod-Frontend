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


const Navbar = () => {
    const { user } = useAuthContext()?.user || {};
    // const { username, avatar } = user || {};
    const { username } = user || {};
    const { avatar: avatarContext } = useAvatarContext();
    // const { dispatch: chatDispatch } = useChatsContext();
    // const { avatar } = useAvatarContext()
    const location = useLocation();
    const pathname = location.pathname;
    const { notifications } = useChatsContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logOut } = useLogOut();

    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        setAvatar(avatarContext);
        // console.log("Changing avatar because of avatarContext...")
      }, [avatarContext]);

    const handleLogOut = () => {
        logOut();
        onClose();
    };

    const handleRemoveNotification = (username) => {
        delete notifications[username];
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
                                        <Stack key={idx} direction="row">
                                            <Avatar name={notif.username} size='sm' src={notif.avatar}/>
                                            <Link to="/chat" onClick={() => handleRemoveNotification(notif.username)}>
                                                <p className='notification-content'>
                                                    New message from {notif.username}
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