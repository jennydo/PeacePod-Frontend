import {Link, useLocation} from 'react-router-dom';
import { useLogOut } from '../../hooks/useLogOut';
import './Navbar.css'

const Navbar = () => {
    const {logOut} = useLogOut()
    const location = useLocation();
    const pathname = location.pathname;

    return ( 
        <nav className="peacepod-navbar">
            <Link to="/"><h1 className = "app-name">PeacePod</h1></Link>
            <div className="links">
                <div>
                    <Link to="/" className={`peacepod-navlink ${pathname === "/" ? "active" : ""}`}>Home</Link>
                    <Link to="/newsfeed" className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`}>NewsFeed</Link>
                    <Link to="/chat" className={`peacepod-navlink ${pathname === "/chat" ? "active" : ""}`}>Messages</Link>
                    <Link to="/meditation" className={`peacepod-navlink ${pathname === "/meditation" ? "active" : ""}`}>Meditation</Link>
                    <Link to="/userprofile" className={`peacepod-navlink ${pathname === "/userprofile" ? "active" : ""}`}>Profile</Link>
                </div>
                <div>
                    <button onClick={() => logOut()}>Logout</button>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;