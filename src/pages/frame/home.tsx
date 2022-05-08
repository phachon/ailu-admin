import {Link} from "react-router-dom";
import React from "react";

class Home extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h1>这里是首页</h1>
                <Link to="/login">点击这里登录</Link>
            </div>
        );
    }
}

export default Home