import React from 'react';
import ReactDOM from 'react-dom';
import zh_CN from "antd/es/locale/zh_CN";
import {ConfigProvider} from "antd";
import RouterView from "./components/RouterView";
import AdminRouters from "./router/index";
import './assets/styles/style.css'
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
