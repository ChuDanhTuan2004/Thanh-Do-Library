import "./avatar.css"

export default function Avatar({size}) {
    const sizeStyle = {width: size, height: size};
    return (
        <div style={sizeStyle}>
            <img className={"avatar"} src={"https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-12.jpg"}/>
        </div>)
}
