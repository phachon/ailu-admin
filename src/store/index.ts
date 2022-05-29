import Token from "../utils/token";
import {applyMiddleware, legacy_createStore as createStore} from "redux";
import {AdminReducer} from "./reducers/AdminReducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
/**
 * 登录 token
 */
export const LoginTokenStore = new Token("AILU_ADMIN_LOGIN_TOKEN", 10 * 60 * 60 * 1000)

/**
 * 全局 store
 */
export const AdminStore = createStore(AdminReducer, composeWithDevTools(applyMiddleware(thunk)))