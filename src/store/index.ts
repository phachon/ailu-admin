import Token from "../utils/token";
import {applyMiddleware, legacy_createStore as createStore} from "redux";
import {AdminReducer} from "./reducers/AdminReducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ProfileInfoType} from "./types/profile";
import LocalStore from "../utils/LocalStore";

// LocalProfileInfoKey 本地存储的 key
export const LocalProfileInfoKey = "AL_ADMIN_PROFILE_INFO"
// setLocalProfileInfo 存储 profile info
export const setLocalProfileInfo = (profileInfo :ProfileInfoType) => {
    LocalStore.setValue(LocalProfileInfoKey, profileInfo)
}
// getLocalProfileInfo 获取 profile info
export const getLocalProfileInfo = (): ProfileInfoType|null => {
    return LocalStore.getValue<ProfileInfoType>(LocalProfileInfoKey)
}

// LocalLoginTokenKey 登录 token 本地存储的 key
export const LocalLoginTokenKey = "AL_ADMIN_LOGIN_TOKEN"
export const LoginTokenStore = new Token(LocalLoginTokenKey, 10 * 60 * 60 * 1000)


/**
 * 全局 store
 */
export const AdminStore = createStore(AdminReducer, composeWithDevTools(applyMiddleware(thunk)))
