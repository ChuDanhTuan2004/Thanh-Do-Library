import Sidebar from "../sidebar/sidebar";
import MainController from "../mainController/MainController";
import './sidebarhomeManager.scss'
import {useState} from "react";

export default function SidebarHomeManager() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [title, setTitle] = useState("Title");

    const setTileFromThread = (title) => {
        setTitle(title)
        setShowSidebar(false);
    }

    return (
        <div className={"sidebar_home_manager"}>
            {showSidebar && (
                <div>
                    <Sidebar setTitle={setTileFromThread}/>
                    <div className={"between_layer"} onClick={() => {
                        setShowSidebar(false)
                    }}>
                    </div>
                </div>
            )}
            <MainController title={title} setShowSidebar={setShowSidebar}/>
        </div>
    )

}