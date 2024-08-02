import { FaBars  } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
export default function MainHeader({children, setShowSidebar}){
    return (
        <div
            className={"main_header p-3 flex justify-between items-center bg-second_primary-900 text-second_primary-0"}>
            <div className={"flex flex-1 items-center"}>
                <div className={"hover:bg-second_primary-600 p-2 rounded-circle hover:cursor-pointer"}>
                    <div onClick={() => {
                        setShowSidebar(true)
                    }}><FaBars/></div>
                </div>
                <h2 className={"ml-4 font-semibold text-xl"}>
                    {children}
                </h2>
            </div>
            <div className={"hover:bg-second_primary-600 p-2 rounded-circle hover:cursor-pointer"}>
                <MdEdit/>
            </div>
        </div>)
}