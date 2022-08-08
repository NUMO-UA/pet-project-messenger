const { useLocation } = require("react-router-dom/cjs/react-router-dom.min")


const RequireAuth = ({children}) => {
    const location = useLocation();
    const auth = false;

    if (!auth) {
        return <Navigate to='/login' state={{from: location}} />
    }

    return children;
}