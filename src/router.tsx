import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import App from "./app";
import Login from "./login";

class Router extends React.Component<any, any> {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router