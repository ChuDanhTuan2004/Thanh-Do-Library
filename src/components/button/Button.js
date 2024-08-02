import {FaBars} from "react-icons/fa";

export default function Button({iconComponent, onClick, size, rounded}) {

    return (
        <button onClick={onClick} className={`hover:bg-second_primary-600 p-2 rounded-circle hover:cursor-pointer ${size} ${rounded}`}>
            {iconComponent}
        </button>
    )
}