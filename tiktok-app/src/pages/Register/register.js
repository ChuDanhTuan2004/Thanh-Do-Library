import {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import userService from "../../service/userService";
import {useNavigate} from "react-router-dom";
import {enqueueSnackbar} from "notistack";
import {useFormik} from "formik";
import * as Yup from "yup";
import CusInput from "../../components/input/Input";

function Register() {
    const {login} = useAuth();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email không hợp lệ")
                .required("Email không được để trống"),
            password: Yup.string()
                .min(8, "Mật khẩu tối thiểu 8 ký tự")
                .required("Mật khẩu không được để trống"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Mật khẩu không trùng")
                .required("Trường này không được để trống!")
        }),
        onSubmit: values => {
            const data = JSON.stringify(values, null, 2)
            userService.doRegister(data)
        }
    });
    const doSubmit = (data) => {
        setLoading(true)
        const promise = userService.doRegister(data)
        // promise.then((res) => {
        //     setLoading(false)
        //     console.log(res)
        //     navigate(`/holder?email=${res.data}`, {replace: true} )
        // }).catch((e) => {
        //     setLoading(false)
        //     if (e?.response.data?.email) {
        //         navigate(`/holder?email=${e.response.data.email}&pending=true`, {replace: true} )
        //     } else {
        //         enqueueSnackbar('Email đã tồn tại!', { variant: 'error', anchorOrigin: {
        //                 vertical: 'top',
        //                 horizontal: 'right'
        //             }})
        //     }
        // })

    }

    const [user, setUser] = useState(
        {
            email: "",
            password: "",
        })


    const submitHandle = (e) => {
        e.preventDefault()
        // axios.post("http://localhost:8080/api/v1/auth/login", user)
        //     .then(res => console.log(res));
        login(user)
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                         alt="logo"/>
                    Messenger
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Đăng ký
                        </h1>
                        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email <span className={"text-red-500"}>*</span>
                                </label>
                                <CusInput
                                    error={formik.errors.email && formik.touched.email}
                                    errorMsg={formik.touched.email && formik.errors.email }
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="example@gmail.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Mật khẩu <span className={"text-red-500"}>*</span>
                                </label>
                                <CusInput
                                    error={formik.errors.password && formik.touched.password}
                                    errorMsg={formik.touched.password && formik.errors.password }
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="example@gmail.com"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="re-password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nhập lại mật khẩu <span className={"text-red-500"}>*</span>
                                </label>
                                <CusInput
                                    error={formik.errors.confirm_password && formik.touched.confirm_password}
                                    errorMsg={formik.touched.confirm_password && formik.errors.confirm_password }
                                    type="password"
                                    name="confirm_password"
                                    id="confirm_password"
                                    placeholder="example@gmail.com"
                                    value={formik.values.confirm_password}
                                    onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            {/*<div>*/}
                            {/*    <label htmlFor="re-password"*/}
                            {/*           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*/}
                            {/*        Nhập lại mật khẩu <span className={"text-red-500"}>*</span>*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        type="password"*/}
                            {/*        name="re-password"*/}
                            {/*        id="re-password"*/}
                            {/*        onChange={(e) => {*/}
                            {/*            setUser({...user, password: e.target.value})*/}
                            {/*        }}*/}
                            {/*        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                            {/*        required=""/>*/}
                            {/*</div>*/}

                            {loading ?
                                <button type="submit"
                                        className="cursor-not-allowed opacity-50 w-full text-white bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
                                        disabled={true}
                                >
                                    <div className={"w-fit"} role="status">
                                        <svg aria-hidden="true"
                                             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"/>
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>


                                </button>
                                :
                                <button type="submit"
                                        className=" w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >Đăng ký
                                </button>}
                        </form>

                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Đã có tài khoản ? <a href={"/login"}
                                                 className={"font-medium text-primary-600 hover:underline"}>Đăng
                            nhập</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;