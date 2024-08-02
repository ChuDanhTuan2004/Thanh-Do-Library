import MainHeader from "./mainHeader/MainHeader";
import Search from "../../search/Search";
import ThreadMessage from "../../threadMessage/threadMessage";

export default function MainController({setShowSidebar, title, selectChatThread, className=""}) {
    return (
        <div className={`md:ml-4 ${className}`}>
            <MainHeader setShowSidebar={setShowSidebar}>{title}</MainHeader>
            <Search/>
            <div className={"p-1"}>
                <ThreadMessage onClickTitle={() => {
                    selectChatThread("Học tiếng anh")
                }} image={"https://i.pinimg.com/736x/74/f4/f5/74f4f548392fbdafbe8a5d9764c83eaf.jpg"}
                   title={"Học Tiếng Anh"}/>
                <ThreadMessage
                    image={"https://ctl.s6img.com/society6/img/CnFTfKZu5-Aebu2t1YyEdwFKs4M/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/5653cd36be88468b8387ee851c6e5cc0/~~/buff-cat-meme-prints.jpg"}
                    title={"Học Tiếng Mẹ Đẻ"}/>
            </div>
        </div>
    )
}