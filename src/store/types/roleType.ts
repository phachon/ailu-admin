import {PageInfoType} from "./baseType";

/**
 * RoleInfoType 角色信息结构
 */
export type RoleInfoType = {
    role_id: number, // 角色ID
    name: string, // 角色名
    remark: string, // 角色备注
    status: number, // 状态
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