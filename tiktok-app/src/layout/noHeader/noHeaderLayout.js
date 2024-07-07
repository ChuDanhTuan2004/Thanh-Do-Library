import Sidebar from "../../components/layoutComponent/sidebar/sidebar";
import SidebarHomeManager from "../../components/layoutComponent/sidebarHomeManager/SidebarHomeManager";



export default function NoHeaderLayout({children}) {
    return (
        <div >
            <SidebarHomeManager />
            <div>
                {children}
            </div>
    </div>)
}