import httpRequest from "./http";
import Base from "./Base";
import { PrivilegeEditInfoType, PrivilegeInfoType, PrivilegeListType } from "../store/types/privilegeType";

const privilegeUrl = {
    privilegeAdd: "/admin/privilege/add",
    privilegeSave: "/admin/privilege/save",
    privilegeList: "/admin/privilege/list",
    privilegeEdit: "/admin/privilege/edit",
    privilegeModify: "/admin/privilege/modify",
    privilegeDelete: "/admin/privilege/delete",
}

/**
 * Privilege 权限服务
 */
class Privilege extends Base {

    public constructor() {
        super()
    }

    /**
     * getAddPrivilegeInfo 获取添加权限信息
     * @returns 
     */
    public getAddPrivilegeInfo(): Promise<PrivilegeListType> {
        let privilegeAddUrl = this.getProxyUrl(privilegeUrl.privilegeAdd)
        return httpRequest.get<PrivilegeListType>(privilegeAddUrl)
    }

    /**
     * savePrivilege 保存权限
     * @param privilegeInfo 权限信息
     * @returns 
     */
    public savePrivilege(privilegeInfo: PrivilegeInfoType): Promise<any> {
        let privilegeSaveUrl = this.getProxyUrl(privilegeUrl.privilegeSave)
        return httpRequest.post<any>(privilegeSaveUrl, {}, privilegeInfo)
    }

    /**
     * 获取编辑权限信息
     * @returns 
     */
    public getEditPrivilegeInfo(privilegeId: bigint): Promise<PrivilegeEditInfoType> { 
        let privilegeEditUrl = this.getProxyUrl(privilegeUrl.privilegeEdit)
        return httpRequest.get<PrivilegeEditInfoType>(privilegeEditUrl, {
            privilege_id: privilegeId
        })
    }

    /**
     * modifyPrivilege 权限修改保存
     * @param privilegeInfo 权限信息
     * @returns 
     */
    public modifyPrivilege(privilegeInfo: PrivilegeInfoType): Promise<any> {
        let privilegeModifyUrl = this.getProxyUrl(privilegeUrl.privilegeModify)
        return httpRequest.post<any>(privilegeModifyUrl, {}, privilegeInfo)
    }

    /**
     * deletePrivilege 删除权限
     * @param privilegeInfo 权限信息
     * @returns 
     */
     public deletePrivilege(privilegeInfo: PrivilegeInfoType): Promise<any> {
        let privilegeDeleteUrl = this.getProxyUrl(privilegeUrl.privilegeDelete)
        return httpRequest.post<any>(privilegeDeleteUrl, {}, privilegeInfo)
    }

    /**
     * privilegeList 权限列表
     */
    public privilegeList(): Promise<PrivilegeListType> {
        let privilegeListUrl = this.getProxyUrl(privilegeUrl.privilegeList)
        return httpRequest.get<PrivilegeListType>(privilegeListUrl, {})
    }
}

export const PrivilegeService = new Privilege()