import {AdminType} from "../types/adminType";
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