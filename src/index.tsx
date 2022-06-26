import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/style.css'
import zh_CN from "antd/es/locale/zh_CN";
import RouterView from "./components/Router/View";
import {ConfigProvider} from "antd";
import AdminRouters from "./router/index";
import {Provider} from "react-redux";
import {AdminStore} from "./store";

ReactDOM.render(
    <Provider store={AdminStore}>
        <ConfigProvider locale={zh_CN}>
            <RouterView routers={AdminRouters} />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
)
