import "./home.scss"
import SidebarHomeManager from "../../components/layoutComponent/sidebarHomeManager/SidebarHomeManager";
import ThreadMessage from "../../components/threadMessage/threadMessage";
import ChatRoom from "../../components/chatRoom/ChatRoom";
import {useState} from "react";

function Home() {
    const [title, setTitle] = useState("")
    return (
      <div className={"min-h-screen w-full bg-second_primary-950 md:pt-4 md:pl-4 "}>
          <SidebarHomeManager selectChatThread={setTitle} />
          {
              title &&  <ChatRoom title={title} exitChatRoom={() => {setTitle("")}}/>
          }
      </div>
    )
}

export default Home;