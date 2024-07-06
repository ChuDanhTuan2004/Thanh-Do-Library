import Sidebar from "../../components/layoutComponent/sidebar/sidebar";


export default function NoHeaderLayout({children}) {
    return (
        <div >
        <Sidebar/>
            <div>
                {children}
            </div>
    </div>)
}