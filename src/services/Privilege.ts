import { getUrlConfig } from "../config/url";
import httpRequest from "./http";
import { PrivilegeInfoType, PrivilegeListType } from "../store/types/privilegeType";

const privilegeUrl = {
    privilegeAdd: "/admin/privilege/add",
    privilegeList: "/admin/privilege/list",
    privilegeUpdate: "/admin/privilege/update",
}

/**
 * Privilege 权限服务
 */
class Privilege {

    /**
     * privilegeUpdate 权限更新
     * @param privilegeInfo 权限信息
     * @returns 
     */
    public privilegeUpdate(privilegeInfo: PrivilegeInfoType): Promise<any> {
        const parentIds: bigint[] = privilegeInfo.parent_ids ? privilegeInfo.parent_ids : [];
        privilegeInfo.is_display = privilegeInfo.display_switch ? 1 : 0;
        privilegeInfo.parent_id = (parentIds.length > 0) ? parentIds[parentIds.length - 1] : BigInt(0)
        let privilegeUpdateUrl = getUrlConfig().proxyUrl + privilegeUrl.privilegeUpdate
        return httpRequest.post<any>(privilegeUpdateUrl, {}, privilegeInfo)
    }

    /**
     * privilegeAdd 添加权限
     * @param privilegeInfo 权限信息
     * @returns 
     */
    public privilegeAdd(privilegeInfo: PrivilegeInfoType): Promise<any> {
        const parentIds: bigint[] = privilegeInfo.parent_ids ? privilegeInfo.parent_ids : [];
        privilegeInfo.is_display = privilegeInfo.display_switch ? 1 : 0;
        privilegeInfo.parent_id = (parentIds.length > 0) ? parentIds[parentIds.length - 1] : BigInt(0)
        let privilegeUpdateUrl = getUrlConfig().proxyUrl + privilegeUrl.privilegeAdd
        return httpRequest.post<any>(privilegeUpdateUrl, {}, privilegeInfo)
    }

    /**
     * privilegeList 权限列表
     */
    public privilegeList(): Promise<PrivilegeListType> {
        let privilegeListUrl = getUrlConfig().proxyUrl + privilegeUrl.privilegeList
        return httpRequest.get<any>(privilegeListUrl, {})
    }
}

export const PrivilegeService = new Privilege()