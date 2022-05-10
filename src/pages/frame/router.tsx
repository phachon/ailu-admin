import Home from "./home";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../login/login";
import './index.css'
import {loginTokenStore} from "../../store/login";
import FrameHome from "./home";

class Router extends React.Component<any, any> {
    home() {
        if (loginTokenStore.checkTokenExpire()) {
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
                    <Route path="/" element={<this.home />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router