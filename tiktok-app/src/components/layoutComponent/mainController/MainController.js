import MainHeader from "./mainHeader/MainHeader";
import Search from "../../search/Search";

export default function  MainController({setShowSidebar, title}){
    return (
        <div>
            <div>
                <MainHeader setShowSidebar={setShowSidebar}>{title}</MainHeader>
                <Search/>
            </div>
        </div>
    )
}