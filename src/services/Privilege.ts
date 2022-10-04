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
     */
    // privilegeUpdate(privilegeInfo: {privilege_id: bigint, name :string, given_name :string, email: string, phone :string, mobile :string}): Promise<any> {
    //     let privilegeUpdateUrl = getUrlConfig().proxyUrl + privilegeUrl.privilegeUpdate
    //     return httpRequest.post<any>(privilegeUpdateUrl, {}, privilegeInfo)
    // }

    /**
     * privilegeAdd 添加权限
     */
    privilegeAdd(privilegeInfo: PrivilegeInfoType): Promise<any> {
        let privilegeUpdateUrl = getUrlConfig().proxyUrl + privilegeUrl.privilegeAdd
        return httpRequest.post<any>(privilegeUpdateUrl, {}, privilegeInfo)
    }

    /**
     * privilegeList 权限列表
     */
    privilegeList(): Promise<PrivilegeListType> {
        let privilegeListUrl = getUrlConfig().proxyUrl + privilegeUrl.privilegeList
        return httpRequest.get<any>(privilegeListUrl, {})
    }
}

export const PrivilegeService = new Privilege()