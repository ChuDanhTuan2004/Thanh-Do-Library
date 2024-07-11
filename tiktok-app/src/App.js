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
import SocketDemo from "./pages/DemoWebsocket/demo";
import Demo from "./pages/DemoWebsocket/demo";

function App() {

    return (
        <AuthProvider>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <Routes>
                <Route path={"/websocket"} element={<Demo/>} />
                <Route path="/" element={
                    <NoHeaderLayout>
                         <Home/>
                    </NoHeaderLayout>
                    } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/holder" element={<VerifyEmailPlaceholderPage />} />
                <Route path="/verifyEmail" element={<VerifiedEmail />} />
                <Route
                    path="/secret"
                    element={
                        <ProtectedRoute>
                            <Secret />
                        </ProtectedRoute>
                    }
                />
            </Routes>
                </SnackbarProvider>
        </AuthProvider>
    );
}

export default App;
