import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className = "navbar">
            <h1>PeacePod</h1>
            <div className="links">
                <Link to="/">Home Page</Link>
                <Link to="/feed">NewsFeed</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/meditation">Meditation</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;