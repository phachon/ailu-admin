import {AccountAddInfoType, AccountDetailInfoType, AccountEditInfoType} from "../store/types/accountType";
import httpRequest from "./http";
import Base from "./Base";

const accountUrl = {
    add: "/admin/account/add",
    save: "/admin/account/save",
    edit: "/admin/account/edit",
    modify: "/admin/account/modify",
    detail: "/admin/account/detail",
    updateStatus: "/admin/account/update_status",
    list: "/admin/account/list",
}

/**
 * Account 账号服务
 */
class Account extends Base {

    public constructor() {
        super();
    }

    /**
     * getAddAccountInfo 获取添加账号信息
     * @returns 
     */
    public getAddAccountInfo(): Promise<AccountAddInfoType> {
        const accountAddUrl = this.getProxyUrl(accountUrl.add)
        return httpRequest.get<AccountAddInfoType>(accountAddUrl)
    }

    /**
     * saveAccount 添加保存账号
     */
    public saveAccount(accountInfo: {}): Promise<any> {
        const accountSaveUrl = this.getProxyUrl(accountUrl.save)
        return httpRequest.post<any>(accountSaveUrl, {}, accountInfo)
    }

    /**
     * getEditAccountInfo 获取编辑账号信息
     */
     public getEditAccountInfo(account_id: bigint): Promise<any> {
        const accountEditUrl = this.getProxyUrl(accountUrl.edit)
         return httpRequest.get<AccountEditInfoType>(accountEditUrl, {
             account_id: account_id,
         })
    }

    /**
     * modifyAccount 修改保存账号
     */
    public modifyAccount(accountEditInfo: {}): Promise<any> {
        const accountModifyUrl = this.getProxyUrl(accountUrl.modify)
        return httpRequest.post<any>(accountModifyUrl, {}, accountEditInfo)
    }

    /**
     * accountList 账号列表
     */
    public accountList(pageSize: number|undefined, pageNum: number|undefined, keywords: {}): Promise<any> {
        const accountListUrl = this.getProxyUrl(accountUrl.list)
        return httpRequest.get<any>(accountListUrl, {
            page_size: pageSize,
            page_num: pageNum,
            keywords: JSON.stringify(keywords),
        })
    }

    /**
     * updateAccountStatus 修改账号状态
     */
    public updateAccountStatus(accountId: bigint, status: number): Promise<any> {
        let accountUpdateStatueUrl = this.getProxyUrl(accountUrl.updateStatus)
        return httpRequest.post<any>(accountUpdateStatueUrl, {}, {
            account_id: accountId,
            status: status,
        })
    }

    /**
     * getAccountDetail 获取账号详情
     * @param accountId 账号ID 
     * @returns 
     */
     public getAccountDetail(accountId: bigint): Promise<AccountDetailInfoType> {
        const accountDetailUrl = this.getProxyUrl(accountUrl.detail)
        return httpRequest.get<AccountDetailInfoType>(accountDetailUrl, {
            account_id: accountId,
        })
    }
}

export const AccountService = new Account()