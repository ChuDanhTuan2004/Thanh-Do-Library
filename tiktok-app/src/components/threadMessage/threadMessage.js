import {FaComment} from "react-icons/fa";

export default function ThreadMessage({reactIcon, title, image }){


    return (
            <div className={"flex my-2"}>
                {image ?
                    <div className={"bg-amber-200 size-9 flex justify-center items-center rounded-xl"}>
                        {reactIcon}
                    </div>
                    :
                    <div className={"bg-amber-200 size-9 flex justify-center items-center rounded-xl"}>
                        {reactIcon}
                    </div>
                }
                <div className={"ml-3"}>{title}</div>
            </div>
    )
}