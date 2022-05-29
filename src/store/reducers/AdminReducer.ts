import {AdminState} from "../states/AdminState";
import {AdminAction} from "../actions/AdminAction";
import {AdminType} from "../types/admin";

const initAdminState: AdminState = {
    loading: false,
}

export const AdminReducer = (adminState: AdminState = initAdminState, action: AdminAction): AdminState => {
    console.log("AdminReducer: ", adminState, action.data)
    switch (action.type) {
        case AdminType.LOADING:
            break;
        case AdminType.LOGIN:
            console.log(action.data.account_info)
            return {
                loading: false,
                accountInfo: action.data.account_info,
            }
        default:
            return adminState
    }
    return adminState
}

