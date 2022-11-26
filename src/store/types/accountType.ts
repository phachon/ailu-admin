import {PageInfoType} from "./baseType";
import { RoleInfoType } from "./roleType";

/**
 * AccountInfoType 账号基础结构
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
    role_ids?: string // 角色ID，逗号隔开
}

/**
 * AccountAddInfoType 添加账号返回结构
 */
export type AccountAddInfoType = {
    roles: RoleInfoType[] // 所有的角色
}

/**
 * AccountEditInfoType 编辑账号返回结构
 */
export type AccountEditInfoType = {
    account_info: AccountInfoType // 账号信息
    account_roles: RoleInfoType[] // 账号角色
    role_list: RoleInfoType[] // 所有的角色
}

/**
 * AccountDetailInfoType 账号详情返回结构
 */
 export type AccountDetailInfoType = {
    account_info: AccountInfoType // 账号信息
    account_roles: RoleInfoType[] // 账号角色
}

/**
 * AccountListType 账号列表返回
 */
export type AccountListType = {
    list: AccountInfoType[]
    page_info: PageInfoType
}

/**
 * AccountSearchType 账号搜索结构定义
 */
export type AccountSearchType = {
    status: string, // 状态 0 正常 -1 禁用
    account_name: string, // 账号名
    given_name: string, // 昵称
}
