import {Link, useLocation} from 'react-router-dom';
import { useLogOut } from '../../hooks/useLogOut';
import { useAuthContext } from '../../hooks/useAuthContext'
import './Navbar.css'
import { Avatar, Menu, MenuButton, MenuItem, MenuList, MenuDivider, 
    useDisclosure, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    HStack, } from '@chakra-ui/react';

const Navbar = () => {
    const { user } = useAuthContext()?.user || {};
    const { username, avatar } = user || {};
    const location = useLocation();
    const pathname = location.pathname;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { logOut } = useLogOut();
    const handleLogOut = () => {
        logOut()
        onClose()
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