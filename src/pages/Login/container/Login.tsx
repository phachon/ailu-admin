import React from 'react';
import LoginUI from "../component/LoginUI";
import {LoginService} from "../../../services/Login";
import {LoginResponseType} from "../../../store/types/loginType";
import {DispatchLoginAction} from "../../../store/actions/adminAction";
import {useDispatch, useSelector} from "react-redux";
import {Form, message} from "antd";

const Login: React.FC = () => {

    const dispatch = useDispatch()

    const [systemLoginForm] = Form.useForm()
    const [domainLoginForm] = Form.useForm()

    /**
     * 系统登录操作
     * @param values
     */
    const systemLoginCallback = (values: { account_name: string; password: string}) => {
        LoginService.systemLogin({
            account_name: values.account_name,
            password: values.password,
            verify_code: "mock",
            // 登录成功
        }).then((loginInfo: LoginResponseType) => {
            DispatchLoginAction(dispatch, loginInfo)
            window.location.href = '/'
            // 登录异常
        }).catch(e => {
            console.log("system login catch: ", e)
            message.error("登录失败："+e, 2)
        })
    }

    /**
     * 域账号登录操作
     * @param values
     */
    const domainLoginCallback = (values: { account_name: string; password: string}) => {
        LoginService.systemLogin({
            account_name: values.account_name,
            password: values.password,
            verify_code: "mock",
            // 登录成功
        }).then((loginInfo: LoginResponseType) => {
            // this.props.loginDispatch(loginInfo)  // redux dispatch
            window.location.href = '/'
            // 登录异常
        }).catch(e => {
            console.log("system login catch: ", e)
        })
    }

    return (
        <>
            <LoginUI
                systemLoginForm={systemLoginForm}
                domainLoginForm={domainLoginForm}
                systemLoginFinishCallback={systemLoginCallback}
                domainLoginFinishCallback={domainLoginCallback}
            />
        </>
    );
}

export default Login