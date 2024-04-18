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
    ModalCloseButton, } from '@chakra-ui/react';

const Navbar = () => {
    const {logOut} = useLogOut();
    const { user } = useAuthContext()?.user || {};
    const { username, avatar } = user || {};
    const location = useLocation();
    const pathname = location.pathname;
    const { isOpen, onOpen, onClose } = useDisclosure()

    return ( 
        <nav className="peacepod-navbar">
            <Link to="/"><h1 className = "app-name">PeacePod</h1></Link>
            <div className="links">
                {user && (
                    <div>
                        <Link to="/" className={`peacepod-navlink ${pathname === "/" ? "active" : ""}`}>Home</Link>
                        <Link to="/newsfeed" className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`}>NewsFeed</Link>
                        <Link to="/chat" className={`peacepod-navlink ${pathname === "/chat" ? "active" : ""}`}>Messages</Link>
                        <Link to="/meditation" className={`peacepod-navlink ${pathname === "/meditation" ? "active" : ""}`}>Meditation</Link>
                        <Menu>
                            <MenuButton px={5} mb={100}>
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
                                <Button colorScheme='blue' mr={3} onClick={() => logOut()} alignContent={"center"}>
                                Logout
                                </Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </div>
                )}   
                {(!user) && (
                    <div>
                        <Link to="/" className={`peacepod-navlink ${pathname === "/" ? "active" : ""}`}>Home</Link>
                        <Link to="/login" className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`}>Login</Link>
                        <Link to="/signup" className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`}>Signup</Link>
                    </div>
                )}
            </div>
        </nav>
     );
}
 
export default Navbar;