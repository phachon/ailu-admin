import {ActionType, AdminAction} from "../actions/adminAction";
import {LoginTokenStore, removeProfileAccountInfo} from "../local";
import {initAdminState, LoginState} from "../states/adminState";


const login = (loginState: LoginState = initAdminState.loginState, action: AdminAction): LoginState => {
    // token 存储
    LoginTokenStore.storageToken(action.data?.login_token)
    return {
        loginToken: action.data?.login_token
    }
}

const logout = (loginState: LoginState = initAdminState.loginState, action: AdminAction): LoginState => {
    // 删除 token 存储 和个人资料存储
    LoginTokenStore.removeToken()
    removeProfileAccountInfo()
    return {
        loginToken: ""
    }
}

export const loginReducer = (loginState: LoginState = initAdminState.loginState, action: AdminAction): LoginState => {
    switch (action.type){
        case ActionType.LOGIN: return login(loginState, action)
        case ActionType.LOGOUT: return logout(loginState, action)
        default: return loginState
    }
}