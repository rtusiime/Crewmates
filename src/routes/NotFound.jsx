import { Link } from "react-router-dom"; 
const NotFound = () => {
    return (
        <div>
            <Link
                to={`/`}>
                <h1>404 Not Found</h1>
            </Link>

        </div>
    );
}

export default NotFound;