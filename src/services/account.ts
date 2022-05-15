import {getUrlConfig} from "../config/url";
import httpRequest from "./http";
import {AccountInfoResp} from "../store/account";


const accountUrl = {
    accountInfo: "/admin/account/info",
}

/**
 * AccountService 账号服务
 */
class AccountService {

    getAccountInfoUrl() :string {
        return getUrlConfig().proxyUrl + accountUrl.accountInfo
    }

    /**
     * getAccountInfo 获取账号信息
     */
    getAccountInfo(): Promise<AccountInfoResp> {
        return httpRequest.get<AccountInfoResp>(this.getAccountInfoUrl(), {})
    }
}
export default AccountService