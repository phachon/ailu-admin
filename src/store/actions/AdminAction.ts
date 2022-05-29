import {AdminType} from "../types/admin";
import {Dispatch} from "redux";

export interface AdminAction {
    type: AdminType
    data: any
}

export const LoginAction = (dispatch: Dispatch, data: any) => {
    dispatch({
        type: AdminType.LOGIN,
        data: data
    })
}