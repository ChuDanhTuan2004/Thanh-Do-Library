import Avatar from "../../avatar/avatar";
import { IoIosSettings } from "react-icons/io";
import { FaChevronDown, FaComment  } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import ThreadMessage from "../../threadMessage/threadMessage";

export default function Sidebar({setTitle}) {
    return (<>
        <div className={"z-20 absolute p-1 w-10/12 min-h-screen text-second_primary-0 bg-second_primary-900"}>
            <div className={"flex p-3 items-center "}>
                <Avatar size={40}/>
                <div className={"pl-2 flex-1 flex items-center text-second_primary-0 "}>
                    Tùng Vũ
                    <div>
                        <FaChevronDown className={"size-4 ml-2 text-second_primary-0"} />
                    </div>
                </div>
                <div>
                    <IoIosSettings className={"size-6 text-second_primary-0"} />
                </div>
            </div>
            <div className={"flex flex-col"}>
                <ThreadMessage
                    setTitle={setTitle}
                    selected
                    reactIcon={<FaComment className={"size-5 text-second_primary-0"}/>}
                    title={"Đoạn chat"}/>
                <ThreadMessage
                    setTitle={setTitle}
                    reactIcon={<AiFillMessage className={"size-5 text-second_primary-0"} />}
                    title={"Tin nhắn đang chờ"}

                />
            </div>
            <div className={"flex flex-col"}>
                <div className={"flex justify-between text-sm my-2"}>
                    <span>Cộng đồng</span>
                    <span className={"text-primary-600"}>Chỉnh sửa</span>
                </div>
                <ThreadMessage noti={"5"} reactIcon={<FaComment className={"size-5"}/>} title={"Tập đoàn Yasuo"}/>
                <ThreadMessage reactIcon={<AiFillMessage className={"size-5"} />} title={"Thanh lý mua bán đồ giá rẻ tại Hà Nội"}/>
            </div>
        </div>
    </>)
}