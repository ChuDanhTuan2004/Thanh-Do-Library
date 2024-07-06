import {useAuth} from "../../context/AuthContext";
import {Navigate, useParams, useSearchParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import axios from "axios";
import userService from "../../service/userService";

export default function VerifyEmailPlaceholderPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email");

    if (!email) {
        return <Navigate to="/login"></Navigate>
    }

    const updateToken = () => {
        const promise = userService.updateVerifyMail(email, 'verify email')
        promise.then()
    }


    return (
        <div
            className="relative flex min-h-screen flex-col items-center  overflow-hidden pt-56  bg-white">
            <div className=" px-5 text-center">
                <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Hãy kiểm tra hộp thư của bạn</h2>
                <div className={"max-w-xl"}>
                    <p className=" mb-2 text-lg text-zinc-500">Chúng tôi đã gửi một đường dẫn xác nhận tới địa chỉ
                        email <span className="font-medium text-primary-600">{email}</span>.</p>
                    <a href="https://mail.google.com/"
                       className="mt-3 inline-block w-96 rounded bg-primary-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">
                        Đi đến Gmail → </a>
                    <p className="mt-3 text-sm font-light text-gray-500 dark:text-gray-400">
                        Bạn chưa nhận được gmail ? <a onClick={updateToken} className="font-medium text-primary-600 hover:underline hover:cursor-pointer dark:text-primary-500">Gửi lại</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
