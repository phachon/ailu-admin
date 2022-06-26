import {Dispatch} from "redux";
import {AccountInfoType, AccountListType} from "../types/accountType";
import {ActionType} from "./adminAction";

// AccountListChangeAction 账号列表刷新
export const AccountListChangeAction = (dispatch: Dispatch, data: AccountListType) => {
    dispatch({
        type: ActionType.ACCOUNT_LIST_CHANGE,
        data: data
    })
}

// AccountSearchChangeAction 账号搜索
export const AccountSearchChangeAction = (dispatch: Dispatch, data: AccountInfoType) => {
    dispatch({
        type: ActionType.ACCOUNT_SEARCH_CHANGE,
        data: data
    })
}

// AccountSearchResetAction 搜索重置
export const AccountSearchResetAction = (dispatch: Dispatch, data: AccountInfoType) => {
    dispatch({
        type: ActionType.ACCOUNT_SEARCH_RESET,
        data: data
    })
}

// AccountEditFinishAction 账号修改完成
export const AccountEditFinishAction = (dispatch: Dispatch, data: AccountInfoType) => {
    dispatch({
        type: ActionType.ACCOUNT_EDIT_FINISH,
        data: data
    })
}

// AccountEditStatusAction 账号修改状态
export const AccountEditStatusAction = (dispatch: Dispatch, data: {account_id: number, status: number}) => {
    dispatch({
        type: ActionType.ACCOUNT_EDIT_STATUS,
        data: data
    })
}