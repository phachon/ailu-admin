import {Dispatch} from "redux";
import {RoleInfoType, RoleListType} from "../types/roleType";
import {ActionType} from "./adminAction";

// RoleListChangeAction 角色列表刷新
export const RoleListChangeAction = (dispatch: Dispatch, data: RoleListType) => {
    dispatch({
        type: ActionType.ROLE_LIST_CHANGE,
        data: data
    })
}

// RoleSearchChangeAction 角色搜索
export const RoleSearchChangeAction = (dispatch: Dispatch, data: RoleInfoType) => {
    dispatch({
        type: ActionType.ROLE_SEARCH_CHANGE,
        data: data
    })
}

// RoleSearchResetAction 搜索重置
export const RoleSearchResetAction = (dispatch: Dispatch, data: RoleInfoType) => {
    dispatch({
        type: ActionType.ROLE_SEARCH_RESET,
        data: data
    })
}

// RoleEditClickAction 角色修改点击
export const RoleEditClickAction = (dispatch: Dispatch, data: RoleInfoType) => {
    dispatch({
        type: ActionType.ROLE_EDIT_CLICK,
        data: data
    })
}

// RoleEditCloseAction 角色修改取消
export const RoleEditCloseAction = (dispatch: Dispatch, data: RoleInfoType) => {
    dispatch({
        type: ActionType.ROLE_EDIT_CLOSE,
        data: data
    })
}

// RoleEditFinishAction 角色修改完成
export const RoleEditFinishAction = (dispatch: Dispatch, data: RoleInfoType) => {
    dispatch({
        type: ActionType.ROLE_EDIT_FINISH,
        data: data
    })
}

// RoleDeleteAction 角色删除
export const RoleDeleteAction = (dispatch: Dispatch, data: {role_id: number, status: number}) => {
    dispatch({
        type: ActionType.ROLE_EDIT_DELETE,
        data: data
    })
}