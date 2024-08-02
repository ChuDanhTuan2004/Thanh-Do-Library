import "./App.scss"
import {Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {ProtectedRoute} from "./context/protectRouter";
import {Secret} from "./context/Secret";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import VerifyEmailPlaceholderPage from "./pages/VerifyEmailPlaceholder/vefifyMailPlaceholderPage";
import {SnackbarProvider} from "notistack";
import VerifiedEmail from "./pages/VerifiedEmail/VerifiedEmail";
import NoHeaderLayout from "./layout/noHeader/noHeaderLayout";
import Home from "./pages/Home/home";

function App() {

    return (
        <AuthProvider>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <Routes>
                    {/*<Route element={<ProtectedRoute requireLogin redirectPath={"/login"}/>}>*/}
                    {/*    <Route path="/" element={<NoHeaderLayout><Home/></NoHeaderLayout>}/>*/}
                    {/*</Route>*/}
                    <Route path="/" element={<NoHeaderLayout><Home/></NoHeaderLayout>}/>

                    <Route element={
                        <ProtectedRoute redirectPath={"/secret"} />} >
                        <Route path="/login" element={<Login/>} />
                    </Route>

                    <Route element={
                        <ProtectedRoute redirectPath={"/secret"} requireLogin={false} />} >
                        <Route path="/register" element={<Register/>} />
                    </Route>

                    <Route path="/holder" element={<VerifyEmailPlaceholderPage/>}/>
                    <Route path="/verifyEmail" element={<VerifiedEmail/>}/>

                    <Route element={
                        <ProtectedRoute redirectPath={"/login"} requireLogin roles={["ROLE_USER"]}/>}>

                        <Route path={"/secret"} element={<Secret/>}/>
                    </Route>
                </Routes>
            </SnackbarProvider>
        </AuthProvider>
    );
}

export default App;
