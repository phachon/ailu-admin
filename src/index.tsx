import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./pages/frame/router";
import zh_CN from "antd/es/locale/zh_CN";
import {ConfigProvider} from "antd";

ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
        <Router />
    </ConfigProvider>,
    document.getElementById('root')
)
