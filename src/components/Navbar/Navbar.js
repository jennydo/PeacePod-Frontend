import {Link} from 'react-router-dom';

const Navbar = () => {
        
    return ( 
        <nav className = "navbar">
            <h1>PeacePod</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/newsfeed">NewsFeed</Link>
                <Link to="/chat">Messages</Link>
                <Link to="/meditation">Meditation</Link>
                <Link to="/userprofile">Profile</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;