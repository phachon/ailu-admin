import Frame from "./index";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../login/login";
import './index.css'

class Router extends React.Component<any, any> {

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Frame />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router