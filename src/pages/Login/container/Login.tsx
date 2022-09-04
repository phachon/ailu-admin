import React, {Component, RefObject} from 'react';
import LoginUI from "../component/LoginUI";
import {LoginService} from "../../../services/Login";
import {LoginResponseType} from "../../../store/types/loginType";
import {Dispatch} from "redux";
import {LoginAction} from "../../../store/actions/adminAction";
import {connect} from "react-redux";
import {message} from "antd";

class Login extends Component<any, any> {

    systemLoginFormRef: RefObject<any>
    domainLoginFormRef: RefObject<any>

    constructor(props: any) {
        super(props);
        this.systemLoginFormRef = React.createRef()
        this.domainLoginFormRef = React.createRef()
    }

    /**
     * 系统登录操作
     * @param values
     */
    systemLoginCallback = (values: { account_name: string; password: string}) => {
        LoginService.systemLogin({
            account_name: values.account_name,
            password: values.password,
            verify_code: "mock",
            // 登录成功
        }).then((loginInfo: LoginResponseType) => {
            this.props.loginDispatch(loginInfo)  // redux dispatch
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
    domainLoginCallback = (values: { account_name: string; password: string}) => {
        LoginService.systemLogin({
            account_name: values.account_name,
            password: values.password,
            verify_code: "mock",
            // 登录成功
        }).then((loginInfo: LoginResponseType) => {
            this.props.loginDispatch(loginInfo)  // redux dispatch
            window.location.href = '/'
            // 登录异常
        }).catch(e => {
            console.log("system login catch: ", e)
        })
    }

    render() {
        return (
            <>
                <LoginUI
                    systemLoginFormRef={this.systemLoginFormRef}
                    systemLoginFinishCallback={this.systemLoginCallback}
                    domainLoginFormRef={this.domainLoginFormRef}
                    domainLoginFinishCallback={this.domainLoginCallback}
                />
            </>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginDispatch: (data: any) => {
            LoginAction(dispatch, data)
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)