import Sidebar from "../sidebar/sidebar";
import MainController from "../mainController/MainController";
import './sidebarhomeManager.scss'
import {useState} from "react";

export default function SidebarHomeManager() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [tile, setTile] = useState("Title");
    return (
        <div className={"sidebar_home_manager"}>
            {showSidebar && (
                <div>
                    <Sidebar setTitle={setTile} setShowSidebar={setShowSidebar}/>
                    <div className={"between_layer"} onClick={() => {
                        setShowSidebar(false)
                    }}>

                    </div>
                </div>
            )}
            <MainController title={tile} setShowSidebar={setShowSidebar}/>
        </div>
    )

}