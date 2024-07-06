import {useAuth} from "./AuthContext";

export const Secret = () => {
    const {user, logout } = useAuth();
    const handleLogout = () => {
        logout();
    };
    return (
        <div>
            <h1>Xin chào {user.user.email} </h1>
            <h1>Role {user.user.roles}</h1>
            <h3>token {user.token}</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};