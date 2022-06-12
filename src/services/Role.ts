import {getUrlConfig} from "../config/url";
import httpRequest from "./http";
import {RoleInfoType, RoleListType} from "../store/types/roleType";

const roleUrl = {
    roleInfo: "/admin/role/info",
    roleUpdate: "/admin/role/update",
    roleAdd: "/admin/role/add",
    roleList: "/admin/role/list",
}

/**
 * role 角色服务
 */
class role {

    /**
     * getRoleInfo 获取角色信息
     */
    getRoleInfo(roleId :bigint): Promise<RoleInfoType> {
        let roleInfoUrl = getUrlConfig().proxyUrl + roleUrl.roleInfo
        return httpRequest.get<RoleInfoType>(roleInfoUrl, {
            role_id: roleId,
        })
    }

    /**
     * roleUpdate 角色更新
     */
    roleUpdate(roleId: number, roleName: string): Promise<any> {
        let roleUpdateUrl = getUrlConfig().proxyUrl + roleUrl.roleUpdate
        return httpRequest.post<any>(roleUpdateUrl, {}, {
            role_id: roleId,
            name: roleName,
        })
    }

    /**
     * roleAdd 添加角色
     */
    roleAdd(roleInfo: {name: string}): Promise<any> {
        let roleUpdateUrl = getUrlConfig().proxyUrl + roleUrl.roleAdd
        return httpRequest.post<any>(roleUpdateUrl, {}, roleInfo)
    }

    /**
     * roleList 角色列表
     */
    roleList(pageSize :number|undefined, pageNum :number|undefined, keywords :{}): Promise<RoleListType> {
        let roleUpdateUrl = getUrlConfig().proxyUrl + roleUrl.roleList
        return httpRequest.get<any>(roleUpdateUrl, {
            page_size: pageSize,
            page_num: pageNum,
            keywords: JSON.stringify(keywords),
        })
    }
}

export const RoleService = new role()