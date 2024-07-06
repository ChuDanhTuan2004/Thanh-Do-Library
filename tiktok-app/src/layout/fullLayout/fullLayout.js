import Header from "../../components/layoutComponent/header/header";

export default function fullLayout({children}) {

       return (
        <>
       <Header>
              <SideBar/>
              {children}
       </Header>
        </>)
}