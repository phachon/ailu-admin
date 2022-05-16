import {getUrlConfig} from "../config/url";
import httpRequest from "./http";
import {AccountInfoResp, AccountUpdatePassReq, AccountUpdateReq} from "../store/account";


const accountUrl = {
    accountInfo: "/admin/account/info",
    accountUpdate: "/admin/account/update",
    accountUpdatePass: "/admin/account/update_password",
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
}
export default AccountService