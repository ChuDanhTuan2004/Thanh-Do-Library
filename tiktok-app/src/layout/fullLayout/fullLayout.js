import Header from "../../components/layoutComponent/header/header";
import Sidebar from "../../components/layoutComponent/sidebar/sidebar";

export default function fullLayout({children}) {

       return (
        <>
       <Header>
              <Sidebar/>
              {children}
       </Header>
        </>)
}