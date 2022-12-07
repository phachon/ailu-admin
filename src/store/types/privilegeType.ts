import { PageInfoType } from "./baseType";

/**
 * PrivilegeInfoType 权限返回结构
 */
export type PrivilegeInfoType = {
    privilege_id: bigint, // 权限ID
    name: string, // 权限名
    parent_id: bigint, // 上级权限ID
    parent_ids: string, // 全部的上级权限ID逗号隔开
    privilege_type: number, // 权限类型
    page_router: string, // 页面路由 path
    api_path: string, // 接口path
    icon: string, // icon 图标
    is_display: number, // 是否显示
    sequence: number, // 排序数字
    create_time: string, // 创建时间
    update_time: string, // 修改时间
}

/**
 * PrivilegeListItemType 权限列表结构
 */
export type PrivilegeListItemType = {
    privilege_info: PrivilegeInfoType, // 权限信息
    child_privileges: PrivilegeListItemType[], // 子权限
}

/**
 * PrivilegeListType 权限列表返回
 */
export type PrivilegeListType = {
    list: PrivilegeListItemType[]
}

/**
 * PrivilegeEditInfoType 编辑权限返回结构
 */
 export type PrivilegeEditInfoType = {
    privilege_info: PrivilegeInfoType // 权限信息
    privilege_list: PrivilegeListItemType[] // 所有的权限
}
