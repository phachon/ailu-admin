import React from "react";
import {Layout, Spin} from "antd";
import FrameFooter from "./component/FrameFooter";
import FrameSidebar from "./component/FrameSidebar";
import FrameHeader from "./component/FrameHeader";
import FrameBreadcrumb from "./component/FrameBreadcrumb";
import {Outlet} from "react-router-dom";
import {ProfileService} from "../../services/Profile";
import {ProfileInfoType} from "../../store/types/profileType";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ProfileAccountUpdateAction} from "../../store/actions/adminAction";
import {AccountInfoType} from "../../store/types/accountType";
import './home.css'

class FrameHome extends React.Component<any, any> {

    componentDidMount() {
        // 获取账号 profile 信息
        ProfileService.getProfileInfo().then((profileInfo: ProfileInfoType) => {
            this.props.profileAccountInfo(profileInfo.account_info) // redux dispatch
            console.log(profileInfo)
        }).catch(e => {
            console.log("get profile catch: ", e)
        })
    }

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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        profileAccountInfo: (data: AccountInfoType) => ProfileAccountUpdateAction(dispatch, data)
    }
}

export default connect(null, mapDispatchToProps)(FrameHome)