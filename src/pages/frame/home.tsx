// import {Route, Routes} from "react-router-dom";
import React from "react";
import {Layout, Spin} from "antd";
import FrameFooter from "./footer";
import FrameSidebar from "./sidebar";
import FrameHeader from "./header";
import './home.css'
import FrameBreadcrumb from "./breadcrumb";
import {Outlet, Route, Routes} from "react-router-dom";
import ProfileInfo from "../profile/info";

class FrameHome extends React.Component<any, any> {

    render() {

        return (
            <Layout>
                <FrameHeader/>
                <Layout>
                    <FrameSidebar/>
                    <Layout className="admin-main">
                        <FrameBreadcrumb />
                        <Layout.Content className="admin-content">
                            {/*<Spin size={"large"}/>*/}
                            <Outlet />
                        </Layout.Content>
                        <FrameFooter />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default FrameHome