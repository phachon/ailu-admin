import {getUrlConfig} from "../config/url";
import httpRequest from "./http";
import {AccountInfoType} from "../store/types/account";

const accountUrl = {
    accountInfo: "/admin/account/info",
    accountUpdate: "/admin/account/update",
    accountUpdatePass: "/admin/account/update_password",
    accountAdd: "/admin/account/add",
    accountList: "/admin/account/list",
}

/**
 * Account 账号服务
 */
class Account {

    /**
     * getAccountInfo 获取账号信息
     */
    getAccountInfo(): Promise<AccountInfoType> {
        let accountInfoUrl = getUrlConfig().proxyUrl + accountUrl.accountInfo
        return httpRequest.get<AccountInfoType>(accountInfoUrl, {})
    }

    /**
     * accountUpdate 账号更新
     */
    accountUpdate(accountInfo :{name :string, given_name :string, email: string, phone :string, mobile :string}): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountUpdate
        return httpRequest.post<any>(accountUpdateUrl, {}, accountInfo)
    }

    /**
     * accountUpdatePass 账号更新密码
     */
    accountUpdatePass(passInfo :{old_pwd :string, new_pwd: string, confirm_pwd: string}): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountUpdatePass
        return httpRequest.post<any>(accountUpdateUrl, {}, passInfo)
    }

    /**
     * accountAddReq 添加账号
     */
    accountAdd(accountInfo :{name :string, given_name :string, email: string, phone :string, mobile :string}): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountAdd
        return httpRequest.post<any>(accountUpdateUrl, {}, accountInfo)
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

const AccountService = new Account()
export default AccountService