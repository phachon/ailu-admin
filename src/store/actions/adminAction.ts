import {Dispatch} from "redux";
import {ProfileInfoType} from "../types/profileType";
import {AccountInfoType} from "../types/accountType";

export enum ActionType {
    LOADING,
    LOGIN,
    LOGOUT,
    PROFILE_ACCOUNT_UPDATE,
}

export interface AdminAction {
    type: ActionType
    data: any
}

// LoginAction 登录
export const LoginAction = (dispatch: Dispatch, data: any) => {
    dispatch({
        type: ActionType.LOGIN,
        data: data
    })
}

// LogoutAction 退出
export const LogoutAction = (dispatch: Dispatch, data: any) => {
    dispatch({
        type: ActionType.LOGOUT,
        data: data
    })
}

// ProfileAccountUpdateAction 更新个人信息
export const ProfileAccountUpdateAction = (dispatch: Dispatch, data: AccountInfoType) => {
    dispatch({
        type: ActionType.PROFILE_ACCOUNT_UPDATE,
        data: data
    })
}
