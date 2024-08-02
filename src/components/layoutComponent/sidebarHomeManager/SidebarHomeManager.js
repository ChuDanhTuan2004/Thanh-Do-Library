import Sidebar from "../sidebar/sidebar";
import MainController from "../mainController/MainController";
import './sidebarhomeManager.scss'
import {useState} from "react";

export default function SidebarHomeManager( {selectChatThread}) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [title, setTitle] = useState("Title");

    const setTileFromThread = (title) => {
        setTitle(title)
        setShowSidebar(false);
    }

    return (
        <div className={"sidebar_home_manager md:flex md:w-1/2"}>
            {/*{showSidebar && (*/}
            {/*    <>*/}
            {/*        <Sidebar setTitle={setTileFromThread}/>*/}
            {/*        <div className={"between_layer lg:hidden"} onClick={() => {*/}
            {/*            setShowSidebar(false)*/}
            {/*        }}>*/}
            {/*        </div>*/}
            {/*    </>*/}
            {/*)}*/}

            <Sidebar
                className={"md:bg-transparent"}
                hidden={!showSidebar}
                setTitle={setTileFromThread}/>
            {showSidebar && <div className={"between_layer md:hidden"} onClick={() => {
                setShowSidebar(false)
            }}>
            </div>}

            <MainController className={"md:flex-1"} selectChatThread={selectChatThread} title={title} setShowSidebar={setShowSidebar}/>
        </div>
    )

}