// import {Route, Routes} from "react-router-dom";
import React from "react";
import {Layout} from "antd";
import FrameFooter from "./footer";
import FrameSidebar from "./sidebar";
import FrameHeader from "./header";
import './home.css'
import FrameBreadcrumb from "./breadcrumb";
import {Route, Routes} from "react-router-dom";

const { Content } = Layout;

class FrameHome extends React.Component<any, any> {

    siderChange (collapsed :boolean) {
        this.setState({
            collapsed: collapsed,
        })
        console.log(collapsed);
    }

    render() {
        const rightStyle = {
            // marginLeft: 0 ? "80px" : "220px"
        };
        return (
            <Layout className="admin-layout" >
                <FrameHeader />
                <Layout className="admin-right" style={rightStyle}>
                    <FrameSidebar siderChange={this.siderChange} />
                    {/*<FrameBreadcrumb />*/}
                    <Layout.Content className="admin-content">
                        <Routes>
                            <Route path="/user/add" />
                            <Route path="/user/list" />
                        </Routes>
                    </Layout.Content>
                    <FrameFooter />
                </Layout>
            </Layout>
        );
    }
}

export default FrameHome