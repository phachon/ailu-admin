import {legacy_createStore as createStore} from "redux";
import {adminReducer} from "./reducers/adminReducer";

/**
 * 全局 store
 */
export const AdminStore = createStore(adminReducer)
