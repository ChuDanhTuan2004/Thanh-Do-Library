import "./input.scss"
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useRef, useState} from "react";

export default function CusInput({error, errorMsg, className, ...passProps}) {
    let classNameInput = className ? className : "";
    if (error) {
        classNameInput += " error";
    }
    const inputRef = useRef();

    const [showPass, setShowPass] = useState(false)

    return <>
        <div className="inpt-wraper relative">
            <input
                {...passProps}
                ref={inputRef}
                className={classNameInput.trim()}
                placeholder={passProps.placeholder}
                value={passProps.value}
                onChange={passProps.onChange}
                name={passProps.name}
                type={showPass ? "text" : passProps.type}
                // type={showPass ? 'text' : passProps.type}
            />
            <p className={"error-msg"}>{errorMsg ? errorMsg : ""}</p>
            {passProps?.type === 'password' && (!showPass ? <div className={"absolute top-1/4 right-3"} onClick={() => {setShowPass(true)}}>
                        <FaEyeSlash className='min-h-5 min-w-5 element-sidebar eye'/>
                    </div> :
                    <div onClick={() => {setShowPass(false)}} className={"absolute top-1/4 right-3 "}>
                        <FaEye className='min-h-5 min-w-5 element-sidebar eye'/>
                    </div>
            )}
        </div>
    </>
}