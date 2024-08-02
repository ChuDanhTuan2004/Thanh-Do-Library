import Avatar from "../../avatar/avatar";
import {IoIosSettings} from "react-icons/io";
import {FaChevronDown, FaComment} from "react-icons/fa";
import {AiFillMessage} from "react-icons/ai";
import ThreadMessage from "../../threadMessage/threadMessage";
import {useState} from "react";
import "./sidebar.scss"
import Button from "../../button/Button";

export default function Sidebar({setTitle, hidden, className}) {
    const [collapsed, setCollapsed] = useState(true)

    return (<>
        <div className={`
        sidebar
        z-20 absolute p-1 w-10/12 min-h-screen text-second_primary-0 bg-second_primary-900 
        md:relative ${hidden && "hidden md:block"} ${collapsed ? "md:w-12" : "md:flex-1"}
        ${className}`}>
            <div className={"flex p-3 items-center md:p-0 "}>
                <Avatar className={"md:mb-3"} size={40}/>
                <div className={`pl-2 flex-1 flex items-center text_primary-0 ${collapsed && "md:hidden"}`}>
                    Tùng Vũ
                    <div>
                        <FaChevronDown className={"size-4 ml-2 text-second_primary-0"}/>
                    </div>
                </div>
                <div>
                    <IoIosSettings className={`size-6 text-second_primary-0 ${collapsed && "md:hidden"}`}/>
                </div>
                <Button

                />
            </div>
            <div className={"flex flex-col"}>
                <ThreadMessage
                    className={"md:p-1"}
                    collapse={collapsed}
                    selected
                    setTitle={setTitle}
                    reactIcon={<FaComment className={"size-5 text-second_primary-0"}/>}
                    title={"Đoạn chat"}/>
                <ThreadMessage
                    className={"md:p-1"}
                    collapse={collapsed}
                    setTitle={setTitle}
                    reactIcon={<AiFillMessage className={"size-5 text-second_primary-0"}/>}
                    title={"Tin nhắn đang chờ"}

                />
            </div>
            <div className={`hidden ${collapsed && "md:block"} seperate my-3 `}></div>

            <div className={`flex justify-between text-sm my-2 ${collapsed ? "md:hidden" : ""}`}>
                <span>Cộng đồng</span>
                <span className={"text-primary-600"}>Chỉnh sửa</span>
            </div>
            <div className={"flex flex-col"}>
                <ThreadMessage
                    collapse={collapsed}
                    className={"md:p-1"}

                    noti={"5"}
                    reactIcon={<FaComment className={"size-5"}/>}
                    title={"Tập đoàn Yasuo"}/>
                <ThreadMessage
                    className={"md:p-1"}
                    collapse={collapsed}

                    reactIcon={<AiFillMessage className={"size-5"}/>} title={"Thanh lý mua bán đồ giá rẻ tại Hà Nội"}/>
            </div>
        </div>
    </>)
}