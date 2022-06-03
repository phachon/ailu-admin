import Token from "../utils/Token";
import {applyMiddleware, legacy_createStore as createStore} from "redux";
import {AdminReducer} from "./reducers/adminReducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

// LocalLoginTokenKey 登录 token 本地存储的 key
export const LocalLoginTokenKey = "AL_ADMIN_LOGIN_TOKEN"
export const LoginTokenStore = new Token(LocalLoginTokenKey, 10 * 60 * 60 * 1000)


/**
 * 全局 store
 */
export const AdminStore = createStore(AdminReducer, composeWithDevTools(applyMiddleware(thunk)))
