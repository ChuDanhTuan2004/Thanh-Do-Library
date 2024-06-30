import {createContext, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage";
import userService from "../service/userService";
import {enqueueSnackbar} from "notistack";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (userForm) => {
        const promise =  userService.doLogin(userForm);
        promise.then(res => {
            setUser(res.data);
            navigate("/secret");
        }).catch(e => {
            enqueueSnackbar('Email hoặc mật khẩu không đúng!', { variant: 'error', anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                } })
            console.log(e);
        })
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        navigate("/secret", {replace: true});
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};