import { IoSearch } from "react-icons/io5";
import Button from "../button/Button";
import { FaArrowLeftLong } from "react-icons/fa6";
import {useState} from "react";
export default function Search(){
    const [showBack, setShowBack] = useState()

    return (
        <div className="search_wrapper flex items-center  p-3 bg-second_primary-900">
            {showBack &&<Button onClick={() => {setShowBack(false)}} iconComponent={<FaArrowLeftLong className={"text-second_primary-0"} />}/>}
            <div className={"bg-second_primary-800 font-extralight flex items-center rounded-full w-full"}>
                <IoSearch className={" text-second_primary-0 mx-2"}/>
                <input onFocus={() => {setShowBack(true)}} className={"caret-second_primary-0 placeholder-second_primary-300 font-light py-2 outline-0 bg-second_primary-800"} placeholder={"Tìm kiếm"}/>
            </div>
        </div>

    )
}