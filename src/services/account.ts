import {getUrlConfig} from "../config/url";
import httpRequest from "./http";
import {AccountInfoResp, AccountUpdateAddReq, AccountUpdatePassReq, AccountUpdateReq} from "../store/account";
import qs from "qs";


const accountUrl = {
    accountInfo: "/admin/account/info",
    accountUpdate: "/admin/account/update",
    accountUpdatePass: "/admin/account/update_password",
    accountAdd: "/admin/account/add",
    accountList: "/admin/account/list",
}

/**
 * AccountService 账号服务
 */
class AccountService {

    /**
     * getAccountInfo 获取账号信息
     */
    getAccountInfo(): Promise<AccountInfoResp> {
        let accountInfoUrl = getUrlConfig().proxyUrl + accountUrl.accountInfo
        return httpRequest.get<AccountInfoResp>(accountInfoUrl, {})
    }

    /**
     * accountUpdate 账号更新
     */
    accountUpdate(accountUpdateReq :AccountUpdateReq): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountUpdate
        return httpRequest.post<any>(accountUpdateUrl, {}, accountUpdateReq)
    }

    /**
     * accountUpdatePass 账号更新密码
     */
    accountUpdatePass(accountRePassReq :AccountUpdatePassReq): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountUpdatePass
        return httpRequest.post<any>(accountUpdateUrl, {}, accountRePassReq)
    }

    /**
     * accountAddReq 添加账号
     */
    accountAdd(accountAddReq :AccountUpdateAddReq): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountAdd
        return httpRequest.post<any>(accountUpdateUrl, {}, accountAddReq)
    }

    /**
     * accountList 账号列表
     */
    accountList(pageSize :number, pageNum :number, keywords :{}): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountList
        return httpRequest.get<any>(accountUpdateUrl, {
            page_size: pageSize,
            page_num: pageNum,
            keywords: JSON.stringify(keywords),
        })
    }
}
export default AccountService