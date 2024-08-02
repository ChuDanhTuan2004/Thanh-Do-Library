import "./avatar.css"
import classnames from 'classnames';

export default function Avatar({size, baseBot, className}) {
    const sizeStyle = {width: size, height: size};

    return (
        <div className={` avatar ${baseBot ? "base_bottom" : ""} ${className? className : ""} `}
             style={sizeStyle}>
            <img className={`avatar-circle`}
                 src={"https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-12.jpg"}/>
        </div>)
}
