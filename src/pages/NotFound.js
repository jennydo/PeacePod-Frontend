import {Link} from 'react-router-dom';

const NotFound = () => {
    return ( 
        <div className = "not-found">
            <h2>Sorry</h2>
            <h3>This page cannot be found</h3>
            <Link to = "/">Back to the Home Page</Link>
        </div>
     );
};
 
export default NotFound;