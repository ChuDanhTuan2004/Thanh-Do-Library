export default function MainHeader({children, setShowSidebar}){
    return (<>
        <button onClick={() => {setShowSidebar(true)}}>Show</button>
        {children}
    </>)
}