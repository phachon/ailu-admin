import {ActionType, AdminAction} from "../actions/adminAction";
import {initAdminState, ProfileState} from "../states/adminState";
import {setProfileAccountInfo} from "../local";

export const profileReducer = (profileState: ProfileState = initAdminState.profileState, action: AdminAction): ProfileState => {
    switch (action.type) {
        case ActionType.PROFILE_ACCOUNT_UPDATE:
            if (action.data !== undefined) {
                setProfileAccountInfo(action.data)
            }
            return {
                ...profileState,
                accountInfo: action.data,
            }
        default:
            return profileState
    }
}