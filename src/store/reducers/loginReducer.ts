import {ActionType, AdminAction} from "../actions/adminAction";
import {LoginTokenStore, removeProfileAccountInfo} from "../local";
import {initAdminState, LoginState} from "../states/adminState";

export const loginReducer = (loginState: LoginState = initAdminState.loginState, action: AdminAction): LoginState => {
    switch (action.type){
        case ActionType.LOGIN:
            // token 存储
            LoginTokenStore.storageToken(action.data?.login_token)
            return {
                loginToken: action.data?.login_token
            }
        case ActionType.LOGOUT:
            // 删除 token 存储 和个人资料存储
            LoginTokenStore.removeToken()
            removeProfileAccountInfo()
            return {
                loginToken: ""
            }
        default:
            return loginState
    }
}