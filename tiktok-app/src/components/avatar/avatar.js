import "./avatar.css"

export default function Avatar({size, baseBot}) {
    const sizeStyle = {width: size, height: size};

    return (
        <div className={` avatar ${baseBot? "base_bottom" : ""}`} style={sizeStyle}>
            <img
                className={`avatar-circle`}
                 src={"https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-12.jpg"}/>
        </div>)
}
