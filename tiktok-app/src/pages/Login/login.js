import {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {object, string} from 'yup';
import {useFormik} from "formik";
import * as Yup from "yup";
import CusInput from "../../components/input/Input";

function Login() {
    const {login} = useAuth();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email không đúng định danng")
                .required("Trường này không được để trống!"),
            password: Yup.string()
                .min(8, "Mật khẩu phải tối thiểu 8 ký tự")
                .required("Trường này không được để trống!"),

        }),
        onSubmit: values => {
            const data = (JSON.stringify(values, null, 2));
            login(data)
        }
    });


    const [user, setUser] = useState(
        {
            email: "vuthanhtungtd2@gmail.com",
            password: "Vuthanhtungtd2",
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
                            Đăng nhập
                        </h1>
                        <form  onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email"
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
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật
                                    khẩu <span className={"text-red-500"}>*</span></label>
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    {/*<div className="flex items-center h-5">*/}
                                    {/*    <input id="remember" aria-describedby="remember" type="checkbox"*/}
                                    {/*           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"*/}
                                    {/*           required=""/>*/}
                                    {/*</div>*/}
                                    {/*<div className="ml-3 text-sm">*/}
                                    {/*    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember*/}
                                    {/*        me</label>*/}
                                    {/*</div>*/}
                                </div>
                                <a href="#"
                                   className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên
                                    mật khẩu ?</a>
                            </div>
                            <button
                                type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Đăng nhập

                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Bạn chưa có tài khoản ? <a href="/register"
                                                           className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng
                                ký tại đây</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;