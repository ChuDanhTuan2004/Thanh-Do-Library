import axios from 'axios';
import { BASE_BE_URL} from "./baseProperties";

export const userService =
    {
        doLogin: async function (user) {
            return await axios.post(`${BASE_BE_URL}api/v1/auth/login`, user);
        },

        doRegister: async function (user) {
            return await axios.post(`${BASE_BE_URL}api/v1/auth/register`, user);
        },

        updateVerifyMail: async function (mail, action) {
            const data = {
                email: mail,
                action: action
            }
            return await axios.post(`${BASE_BE_URL}api/verificationToken/update`, data);
        },

        getPost: function (id) {
            /// Method will be get
            /// and change url to (`post/${id}`)
        },

        verifyToken: async function (token) {
            console.log(token)
            return await axios.get(`${BASE_BE_URL}api/verificationToken?token=${token}`);
        },
    }


export default userService;