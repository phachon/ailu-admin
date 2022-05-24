import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/login/login";
import '../pages/frame/index.css'
import '../assets/styles/style.css'
import {LoginTokenStore} from "../store";
import FrameHome from "../pages/frame/home";
import ProfileInfo from "../pages/profile/info";
import ProfileRepass from "../pages/profile/repass";
import AccountAdd from "../pages/account/add";
import AccountList from "../pages/account/list";

class Router extends React.Component<any, any> {
    home() {
        if (LoginTokenStore.checkTokenExpire()) {
            return <FrameHome />;
        }
        return <Login />
    }
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<this.home />} />
                    <Route path="/" element={<this.home />} >
                        <Route path='/profile/info' element={<ProfileInfo />} />
                        <Route path='/profile/repass' element={<ProfileRepass />} />
                        <Route path='/account/add' element={<AccountAdd />} />
                        <Route path='/account/list' element={<AccountList />} />
                        <Route path='/account/update' element={<AccountAdd />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router