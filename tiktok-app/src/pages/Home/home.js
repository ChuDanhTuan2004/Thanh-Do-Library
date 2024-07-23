import "./home.scss"
import SidebarHomeManager from "../../components/layoutComponent/sidebarHomeManager/SidebarHomeManager";
import ThreadMessage from "../../components/threadMessage/threadMessage";
import ChatRoom from "../../components/chatRoom/ChatRoom";
import {useState} from "react";
function Home() {
    const [title, setTitle] = useState("")
    return (
      <div className={"min-h-screen w-full bg-second_primary-950"}>
          <SidebarHomeManager />
          <div className={"p-1"}>
              <ThreadMessage onClickTitle={() => {setTitle("Học tiếng anh")}} image={"https://i.pinimg.com/736x/74/f4/f5/74f4f548392fbdafbe8a5d9764c83eaf.jpg"} title={"Học Tiếng Anh"} />
              <ThreadMessage image={"https://ctl.s6img.com/society6/img/CnFTfKZu5-Aebu2t1YyEdwFKs4M/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/5653cd36be88468b8387ee851c6e5cc0/~~/buff-cat-meme-prints.jpg"} title={"Học Tiếng Mẹ Đẻ"}/>
          </div>
          {
              title &&  <ChatRoom title={title} exitChatRoom={() => {setTitle("")}}/>
          }
      </div>
    )
}

export default Home;