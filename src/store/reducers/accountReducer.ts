import {AdminAction} from "../actions/adminAction";
import {AccountState, initAdminState} from "../states/adminState";

export const accountReducer = (accountState: AccountState = initAdminState.accountState, action: AdminAction): AccountState => {
    return accountState
}