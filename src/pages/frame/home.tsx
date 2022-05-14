// import {Route, Routes} from "react-router-dom";
import React from "react";
import {Layout} from "antd";
import FrameFooter from "./footer";
import FrameSidebar from "./sidebar";
import FrameHeader from "./header";
import './home.css'
import FrameBreadcrumb from "./breadcrumb";
import {Route, Routes} from "react-router-dom";

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
                            <Routes>
                                <Route path="/user/add" />
                                <Route path="/user/list" />
                            </Routes>
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            ...
                            <br />

                            content
                            ...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            <h1>这是主页内容这是主页内容这是主页内容这是主页内容</h1>
                            ...
                            <br />

                            content
                            ...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content...
                            <br />

                            content
                        </Layout.Content>
                        <FrameFooter />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default FrameHome