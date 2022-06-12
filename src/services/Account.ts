import {getUrlConfig} from "../config/url";
import httpRequest from "./http";
import {AccountInfoType} from "../store/types/accountType";

const accountUrl = {
    accountInfo: "/admin/account/info",
    accountUpdate: "/admin/account/update",
    accountUpdateStatus: "/admin/account/update_status",
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
    getAccountInfo(accountId: bigint): Promise<AccountInfoType> {
        let accountInfoUrl = getUrlConfig().proxyUrl + accountUrl.accountInfo
        return httpRequest.get<AccountInfoType>(accountInfoUrl, {
            account_id: accountId,
        })
    }

    /**
     * accountUpdate 账号更新
     */
    accountUpdate(accountInfo: {account_id: bigint, name :string, given_name :string, email: string, phone :string, mobile :string}): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountUpdate
        return httpRequest.post<any>(accountUpdateUrl, {}, accountInfo)
    }

    /**
     * accountAddReq 添加账号
     */
    accountAdd(accountInfo: {name :string, given_name :string, email: string, phone :string, mobile :string}): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountAdd
        return httpRequest.post<any>(accountUpdateUrl, {}, accountInfo)
    }

    /**
     * accountList 账号列表
     */
    accountList(pageSize: number|undefined, pageNum: number|undefined, keywords: {}): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountList
        return httpRequest.get<any>(accountUpdateUrl, {
            page_size: pageSize,
            page_num: pageNum,
            keywords: JSON.stringify(keywords),
        })
    }

    /**
     * accountUpdate 账号更新
     */
    accountUpdateStatus(accountId: bigint, status: number): Promise<any> {
        let accountUpdateUrl = getUrlConfig().proxyUrl + accountUrl.accountUpdateStatus
        return httpRequest.post<any>(accountUpdateUrl, {}, {
            account_id: accountId,
            status: status,
        })
    }
}

export const AccountService = new Account()