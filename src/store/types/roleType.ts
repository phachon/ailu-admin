import {PageInfoType} from "./baseType";

/**
 * RoleInfoType 角色信息结构
 */
export type RoleInfoType = {
    role_id: bigint, // 角色ID
    name: string, // 角色名
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

