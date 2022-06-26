import React from "react";
import {Layout, Spin} from "antd";
import {Outlet} from "react-router-dom";
import {ProfileService} from "../../../services/Profile";
import {ProfileInfoType} from "../../../store/types/profileType";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {LogoutAction, ProfileAccountUpdateAction} from "../../../store/actions/adminAction";
import {AccountInfoType} from "../../../store/types/accountType";
import '../component/home.css'
import FrameHeaderUI from "../component/HeaderUI";
import FrameSidebarUI from "../component/SidebarUI";
import FrameBreadcrumbUI from "../component/BreadcrumbUI";
import FrameFooterUI from "../component/FooterUI";

class FrameHome extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            accountInfo: undefined
        }
    }

    /**
     * 数据初始化
     */
    componentDidMount() {
        this.getProfileInfo()
    }

    /**
     * 登录退出操作
     */
    logoutCallback = () => {
        this.props.logoutDispatch() // dispatch redux
        window.location.href = "/"
    }

    /**
     * 获取个人资料
     */
    getProfileInfo() {
        ProfileService.getProfileInfo().then((profileInfo: ProfileInfoType) => {
            this.props.accountUpdateDispatch(profileInfo.account_info) // redux dispatch
            this.setState({
                accountInfo: profileInfo.account_info
            })
        }).catch(e => {
            console.log("get profile catch: ", e)
        })
    }

    render() {
        return (
            <Layout>
                <FrameHeaderUI
                    loginAccountInfo={this.state?.accountInfo}
                    logoutCallback={this.logoutCallback}
                />
                <Layout>
                    <FrameSidebarUI />
                    <Layout className="admin-main">
                        <FrameBreadcrumbUI />
                        <Layout.Content className="admin-content">
                            <Outlet />
                        </Layout.Content>
                        <FrameFooterUI />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        accountUpdateDispatch: (data: AccountInfoType) => ProfileAccountUpdateAction(dispatch, data),
        logoutDispatch: () => LogoutAction(dispatch, null)
    }
}

export default connect(null, mapDispatchToProps)(FrameHome)