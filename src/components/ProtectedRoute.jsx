import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = useRecoilValue(userAtom);
    if (!user) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};

export default ProtectedRoute;