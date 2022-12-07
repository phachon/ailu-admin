import httpRequest from "./http";
import {RoleEditInfoType, RoleListType, RolePrivilegeEditType} from "../store/types/roleType";
import Base from "./Base";
import { AccountListType } from "../store/types/accountType";

const roleUrl = {
    roleSave: "/admin/role/save",
    roleEdit: "/admin/role/edit",
    roleModify: "/admin/role/modify",
    roleList: "/admin/role/list",
    roleDelete: "/admin/role/delete",
    accountList: "/admin/role/account_list",
    privilegeEdit: "/admin/role/privilege_edit",
    privilegeModify: "/admin/role/privilege_modify",
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
     * @param roleId 角色id
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
     * @param pageSize 每一页条数
     * @param pageNum 页数
     * @param keywords 搜索值
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
     * getAccountList 获取账号列表
     * @param pageSize 每一页条数
     * @param pageNum 页数
     * @param roleId 角色ID
     */
     public getAccountList(pageSize?: number, pageNum?: number, roleId?: number): Promise<AccountListType> {
        const roleAccountListUrl = this.getProxyUrl(roleUrl.accountList)
        return httpRequest.get<AccountListType>(roleAccountListUrl, {
            page_size: pageSize,
            page_num: pageNum,
            role_id: roleId
        })
    }

    /**
     * deleteRole 删除角色
     * @param roleId 角色id
     */
    public deleteRole(roleId: number): Promise<any> {
        const deleteRoleUrl = this.getProxyUrl(roleUrl.roleDelete)
        return httpRequest.post<any>(deleteRoleUrl, {
            role_id: roleId,
        })
    }

    /**
     * getPrivilegeEdit 获取权限修改信息
     * @param roleId 角色ID
     */
     public getPrivilegeEdit(roleId: number): Promise<RolePrivilegeEditType> {
        const rolePrivilegeEditUrl = this.getProxyUrl(roleUrl.privilegeEdit)
        return httpRequest.get<RolePrivilegeEditType>(rolePrivilegeEditUrl, {
            role_id: roleId
        })
    }
    
    /**
     * modifyRolePrivilege 角色权限保存
     * @param roleId 角色ID
     */
     public modifyRolePrivilege(roleId: number, privilegeIds: BigInt[]): Promise<any> {
        const rolePrivilegeModifyUrl = this.getProxyUrl(roleUrl.privilegeModify)
        return httpRequest.post<any>(rolePrivilegeModifyUrl, {
            role_id: roleId,
            privilege_ids: privilegeIds.join(",") // eg: "123,456,11,21"
        })
    }
}

export const RoleService = new Role()