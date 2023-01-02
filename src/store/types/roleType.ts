import {PageInfoType} from "./baseType";
import { PrivilegeListItemType } from "./privilegeType";

export const RoleTypeCustomRole         = 0 // 自定义角色
export const RoleTypeAccountDefaultRole = 1 // 账号默认角色

/**
 * RoleInfoType 角色信息结构
 */
export type RoleInfoType = {
    role_id: number, // 角色ID
    name: string, // 角色名
    remark: string, // 角色备注
    status: number, // 状态
    role_type: number, // 角色类型
    create_time: string, // 创建时间
    update_time: string, // 修改时间
}

/**
 * RoleListType 角色列表结构
 */
export type RoleListType = {
    list: Array<RoleInfoType>
    page_info: PageInfoType
}

/**
 * RoleEditInfoType 角色修改信息返回结构
 */
export type RoleEditInfoType = {
    role_info: RoleInfoType
}

/**
 * RolePrivilegeEditType 角色权限修改返回结构
 */
export type RolePrivilegeEditType = {
    all_privilege: PrivilegeListItemType[]
    privilege_ids: BigInt[]
}