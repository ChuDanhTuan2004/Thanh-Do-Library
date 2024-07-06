import Avatar from "../../avatar/avatar";
import { IoIosSettings } from "react-icons/io";
import { FaChevronDown, FaComment  } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import ThreadMessage from "../../threadMessage/threadMessage";



export default function Sidebar() {
    return (<>
        <div className={"absolute p-3 w-10/12 min-h-screen bg-amber-600"}>
            <div className={"flex pb-3 items-center "}>
                <Avatar size={40}/>
                <div className={"pl-2 flex-1 flex items-center "}>
                    Tùng Vũ
                    <div>
                        <FaChevronDown className={"size-4 ml-2"} />
                    </div>
                </div>
                <div>
                    <IoIosSettings className={"size-6"} />
                </div>
            </div>
            <div className={"flex flex-col"}>
                <ThreadMessage reactIcon={<FaComment className={"size-5"}/>} title={"Đoạn chat"}/>
                <ThreadMessage reactIcon={<AiFillMessage className={"size-5"} />} title={"Tin nhắn đang chờ"}/>
            </div>
            <div className={"flex flex-col"}>
                <div className={"flex justify-between text-sm my-2"}>
                    <span>Cộng đồng</span>
                    <span className={"text-primary-600"}>Chỉnh sửa</span>
                </div>
                <ThreadMessage reactIcon={<FaComment className={"size-5"}/>} title={"Tập đoàn Yasuo"}/>
                <ThreadMessage reactIcon={<AiFillMessage className={"size-5"} />} title={"Thanh lý mua bán đồ giá rẻ tại Hà Nội"}/>
            </div>
        </div>
    </>)
}