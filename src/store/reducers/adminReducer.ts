import {AdminState} from "../states/adminState";
import {AdminAction} from "../actions/adminAction";
import {AdminType} from "../types/adminType";
import {getLocalProfileInfo, setLocalProfileInfo} from "../local";

const profileInfo = getLocalProfileInfo()

const initAdminState: AdminState = {
    loading: false,
    accountInfo: profileInfo?.account_info
}

export const AdminReducer = (adminState: AdminState = initAdminState, action: AdminAction): AdminState => {
    console.log("AdminReducer: ", adminState, action.data)
    switch (action.type) {
        case AdminType.LOADING:
            break;
        case AdminType.LOGIN:
            console.log(action.data.account_info)
            // local store set accountInfo
            setLocalProfileInfo(action.data)
            return {
                loading: false,
                // accountInfo: action.data.account_info,
            }
        default:
            return adminState
    }
    return adminState
}

