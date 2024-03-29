import {Link, useLocation} from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();
    const pathname = location.pathname;

    return ( 
        <nav className="peacepod-navbar">
            <h1>PeacePod</h1>
            <div className="links">
                <Link to="/" className={`peacepod-navlink ${pathname === "/" ? "active" : ""}`}>Home</Link>
                <Link to="/newsfeed" className={`peacepod-navlink ${pathname === "/newsfeed" ? "active" : ""}`}>NewsFeed</Link>
                <Link to="/chat" className={`peacepod-navlink ${pathname === "/chat" ? "active" : ""}`}>Messages</Link>
                <Link to="/meditation" className={`peacepod-navlink ${pathname === "/meditation" ? "active" : ""}`}>Meditation</Link>
                <Link to="/userprofile" className={`peacepod-navlink ${pathname === "/userprofile" ? "active" : ""}`}>Profile</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;