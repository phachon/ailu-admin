import React from "react";
import {Layout, Spin} from "antd";
import FrameFooter from "./component/FrameFooter";
import FrameSidebar from "./component/FrameSidebar";
import FrameHeader from "./component/FrameHeader";
import FrameBreadcrumb from "./component/FrameBreadcrumb";
import {Outlet} from "react-router-dom";
import './home.css'

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