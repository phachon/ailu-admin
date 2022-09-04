import React from "react";
import {Layout, MenuProps, Spin} from "antd";
import {Link, Outlet} from "react-router-dom";
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
import {ProfileOutlined, TeamOutlined, UnorderedListOutlined, UserOutlined, LockOutlined} from "@ant-design/icons";

const menuItems: MenuProps['items'] = [
    {
        label: '个人中心',
        key: 'profile',
        children: [
            { label: <Link to="/profile/info">个人信息</Link>, key: 'profile-info',  icon: <UnorderedListOutlined />},
            { label: <Link to="/profile/repass">修改密码</Link>, key: 'profile-repass', icon: <UnorderedListOutlined /> },
        ],
        icon: <ProfileOutlined />,
    },
    {
        label: '账号管理',
        key: 'account',
        children: [
            { label: <Link to="/account/add">添加账号</Link>, key: 'account-add',  icon: <UnorderedListOutlined />},
            { label: <Link to="/account/list">账号列表</Link>, key: 'account-list', icon: <UnorderedListOutlined /> },
        ],
        icon: <UserOutlined />,
    },
    {
        label: '角色管理',
        key: 'role',
        children: [
            { label: <Link to="/role/add">添加角色</Link>, key: 'role-add',  icon: <UnorderedListOutlined />},
            { label: <Link to="/role/list">角色列表</Link>, key: 'role-list', icon: <UnorderedListOutlined /> },
        ],
        icon: <TeamOutlined />,
    },
    {
        label: '权限管理',
        key: 'privilege',
        children: [
            { label: <Link to="/privilege/add">添加权限</Link>, key: 'privilege-add',  icon: <UnorderedListOutlined />},
            { label: <Link to="/privilege/list">权限列表</Link>, key: 'privilege-list', icon: <UnorderedListOutlined /> },
        ],
        icon: <LockOutlined />,
    },
]

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
                    <FrameSidebarUI menuItems={menuItems}/>
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