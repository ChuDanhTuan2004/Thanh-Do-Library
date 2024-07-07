import {FaComment} from "react-icons/fa";
import "./threadMessage.scss"

export default function ThreadMessage({reactIcon, title, image, noti, selected, setTitle }){


    return (
            <div onClick={() => {setTitle(title)}} className={`threadMessage flex rounded py-1 my-1 ${selected ? "bg-second_primary-600" : ""}`}>
                {image ?
                    <img
                        alt={"thread Image"}
                        src={image}
                        className={" size-9 flex justify-center items-center rounded-xl"}
                    />
                    :
                    <div className={" size-9 flex justify-center items-center rounded-xl"}>
                        {reactIcon}
                    </div>
                }
                <div className={"flex items-center flex-1"}>
                    <div className={"ml-3 flex-1"}>{title}</div>
                    <div className={"noti p-1 bg-blue-400"}>{noti}</div>
                </div>

            </div>
    )
}