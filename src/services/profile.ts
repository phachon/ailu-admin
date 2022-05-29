import {getUrlConfig} from "../config/url";
import httpRequest from "./http";
import {AccountInfoType} from "../store/types/account";

const profileUrl = {
    profileInfo: "/admin/profile/info",
    profileUpdate: "/admin/profile/update",
    profileRepass: "/admin/profile/repass",
}

/**
 * profile 个人中心服务
 */
class profile {

    /**
     * getProfileInfo 获取个人信息
     */
    getProfileInfo(): Promise<AccountInfoType> {
        let profileInfoUrl = getUrlConfig().proxyUrl + profileUrl.profileInfo
        return httpRequest.get<AccountInfoType>(profileInfoUrl, {})
    }

    /**
     * profileUpdate 个人信息更新
     */
    profileUpdate(profileInfo :{name :string, given_name :string, email: string, phone :string, mobile :string}): Promise<any> {
        let profileUpdateUrl = getUrlConfig().proxyUrl + profileUrl.profileUpdate
        return httpRequest.post<any>(profileUpdateUrl, {}, profileInfo)
    }

    /**
     * profileRepass 更新个人中心密码
     */
    profileRepass(passInfo :{old_pwd :string, new_pwd: string, confirm_pwd: string}): Promise<any> {
        let profileUpdateUrl = getUrlConfig().proxyUrl + profileUrl.profileRepass
        return httpRequest.post<any>(profileUpdateUrl, {}, passInfo)
    }
}

const ProfileService = new profile()
export default ProfileService