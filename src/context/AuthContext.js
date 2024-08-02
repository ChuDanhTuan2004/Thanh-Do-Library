import {createContext, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage";
import userService from "../service/userService";
import {enqueueSnackbar} from "notistack";
import {axiosInstance} from "../service/baseProperties";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (userForm) => {
        const promise = userService.doLogin(userForm);
        return promise.then(res => {
            setUser(res.data);
            // setToken(res.data.token)
            navigate("/secret");
        }).catch(e => {
            enqueueSnackbar('Email hoặc mật khẩu không đúng!', {
                variant: 'error', anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
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

const setToken = (token) => {
    axios.interceptors.request.use(function (config) {
        config.headers.Authorization =  `Bearer ${token}`;
        return config;
    });
}