import httpRequest from "./http";
import {RoleEditInfoType, RoleListType} from "../store/types/roleType";
import Base from "./Base";

const roleUrl = {
    roleSave: "/admin/role/save",
    roleEdit: "/admin/role/edit",
    roleModify: "/admin/role/modify",
    roleList: "/admin/role/list",
    roleDelete: "/admin/role/delete",
}

/**
 * Role 角色服务
 */
class Role extends Base {

    public constructor() {
        super()
    }

    /**
     * saveRole 添加角色保存
     * @param roleInfo 添加角色信息
     */
    public saveRole(roleInfo: {}): Promise<any> {
        const saveRoleUrl = this.getProxyUrl(roleUrl.roleSave)
        return httpRequest.post<any>(saveRoleUrl, {}, roleInfo)
    }

    /**
     * getEditRoleInfo 获取编辑角色信息
     */
     public getEditRoleInfo(roleId: number): Promise<RoleEditInfoType> {
        const roleEditUrl = this.getProxyUrl(roleUrl.roleEdit)
         return httpRequest.get<RoleEditInfoType>(roleEditUrl, {
             role_id: roleId,
         })
    }

    /**
     * modifyRole 更新角色保存
     * @param editRoleInfo 修改的信息
     * @returns 
     */
    public modifyRole(editRoleInfo: {}): Promise<any> {
        const roleModifyUrl = this.getProxyUrl(roleUrl.roleModify)
        return httpRequest.post<any>(roleModifyUrl, {}, editRoleInfo)
    }

    /**
     * getRoleList 获取角色列表
     */
    public getRoleList(pageSize?: number, pageNum?: number, keywords?: {}): Promise<RoleListType> {
        const roleListUrl = this.getProxyUrl(roleUrl.roleList)
        return httpRequest.get<RoleListType>(roleListUrl, {
            page_size: pageSize,
            page_num: pageNum,
            keywords: JSON.stringify(keywords),
        })
    }

    /**
     * deleteRole 删除角色
     */
    public deleteRole(roleId: number): Promise<any> {
        const deleteRoleUrl = this.getProxyUrl(roleUrl.roleDelete)
        return httpRequest.post<any>(deleteRoleUrl, {
            role_id: roleId,
        })
    }
}

export const RoleService = new Role()