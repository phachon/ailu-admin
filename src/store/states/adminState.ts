import {getProfileAccountInfo, LoginTokenStore} from "../local";
import {AccountInfoType} from "../types/accountType";
import {TablePaginationConfig} from "antd";
import {RoleInfoType} from "../types/roleType";

const loginToken = LoginTokenStore.getToken()
const accountInfo = getProfileAccountInfo()

export const initAdminState: AdminState = {
    loginState: {
        loginToken: loginToken,
    },
    frameState: {

    },
    profileState: {
        accountInfo: accountInfo
    },
}

// AdminState 全局的根 state
export interface AdminState {
    loginState: LoginState // 登录相关 state
    frameState: FrameState // 整体框架 state
    profileState: ProfileState  // 个人资料 state
}

// LoginState 登录 state
export interface LoginState {
    loginToken: string
}

// FrameState 整体框架 state
export interface FrameState {

}

// ProfileState 个人资料的 state
export interface ProfileState {
    accountInfo?: AccountInfoType
}

// AccountState 账号相关 state
export interface AccountState {
    listLoading: boolean
    accountList?: AccountInfoType[]
    pagination: TablePaginationConfig
    searchKeyWords?: {}
    // editModalVisible?: boolean
    // editAccountInfo?: AccountInfoType
}

export const initPagination: TablePaginationConfig = {
    current: 1,
    pageSize: 10,
    total: 0,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total :number) => {return `总共 ${total} 条`}
}