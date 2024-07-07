import {FaComment} from "react-icons/fa";
import "./threadMessage.scss"

export default function ThreadMessage({reactIcon, title, image, noti, selected, setTitle }){
    const onClickFunc = () => {
        if (setTitle) {
            setTitle(title);
        }
    }

    return (
            <div onClick={onClickFunc} className={`p-3 items-center threadMessage flex rounded my-1 hover:bg-second_primary-800 hover:cursor-pointer ${selected ? "bg-second_primary-600" : ""}`}>
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
                <div className={"flex text-second_primary-0 items-center h-12 flex-1"}>
                    <div className={"ml-3 flex-1"}>{title}</div>
                    {/*<div className={"noti p-1 bg-blue-400"}>{noti}</div>*/}
                </div>

            </div>
    )
}