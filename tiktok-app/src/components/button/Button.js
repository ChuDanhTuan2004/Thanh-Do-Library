import {FaBars} from "react-icons/fa";

export default function Button({iconComponent, onClick}) {
    return (
        <button onClick={onClick} className={"hover:bg-second_primary-600 p-2 rounded-circle hover:cursor-pointer"}>
            {iconComponent}
        </button>
    )
}