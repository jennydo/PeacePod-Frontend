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
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
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
    const { avatar: avatarContext } = useAvatarContext()
    // const { avatar } = useAvatarContext()
    const location = useLocation();
    const pathname = location.pathname;
    const { notifications } = useChatsContext();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { logOut } = useLogOut();

    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        setAvatar(avatarContext);
        // console.log("Changing avatar because of avatarContext...")
      }, [avatarContext]);

    const handleLogOut = () => {
        logOut()
        onClose()
    }

    const getSender = (loggedUser, users) => {
        return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
    };

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
                                    {!notifications.length && <p>No new message.</p>}
                                    {notifications && notifications.map(notif => (
                                        <Stack key={notif._id} direction={'row'}>
                                            <Avatar size='sm' name={notif.username} src={notif.avatar}/>
                                            <p className='notification-content'>
                                                New message from {notif.username}
                                            </p>
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