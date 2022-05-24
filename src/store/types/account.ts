import {PageInfoType} from "./response";

/**
 * AccountInfoType 账号返回结构
 */
export type AccountInfoType = {
    account_id: bigint, // 账号ID
    name: string, // 账号名
    given_name: string, // 昵称
    email: string, // 邮箱
    phone: string, // 电话
    mobile: string, // 手机号码
    status: number, // 状态
    create_time: string, // 创建时间
    update_time: string, // 修改时间
}

/**
 * AccountListType 账号列表返回
 */
export type AccountListType = {
    list: Array<AccountInfoType>
    page_info: PageInfoType
}

