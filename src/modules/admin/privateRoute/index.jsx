import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = +sessionStorage.getItem('isLoggedIn');
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;;
};

export default PrivateRoute;