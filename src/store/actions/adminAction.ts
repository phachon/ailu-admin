import {Dispatch} from "redux";
import {AccountInfoType, AccountListType} from "../types/accountType";

export enum ActionType {
    LOADING,
    LOGIN,
    LOGOUT,
    PROFILE_ACCOUNT_UPDATE,
    ACCOUNT_LIST_CHANGE,
    ACCOUNT_SEARCH_CHANGE,
    ACCOUNT_SEARCH_RESET,
    ACCOUNT_EDIT_FINISH,
    ACCOUNT_EDIT_STATUS,
    ROLE_LIST_CHANGE,
    ROLE_SEARCH_CHANGE,
    ROLE_SEARCH_RESET,
    ROLE_EDIT_FINISH,
    ROLE_DELETE
}

export interface AdminAction {
    type: ActionType
    data: any
}

// DispatchLoginAction 登录动作
export const DispatchLoginAction = (dispatch: Dispatch, data: any) => {
    dispatch({
        type: ActionType.LOGIN,
        data: data
    })
}

// DispatchLogoutAction 退出动作
export const DispatchLogoutAction = (dispatch: Dispatch, data: any) => {
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

