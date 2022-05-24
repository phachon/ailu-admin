import httpRequest from "./http";
import {getUrlConfig} from "../config/url";
import {LoginResponseType} from "../store/types/login";

const authUrl = {
    systemLogin: "/admin/auth/login",
    domainLogin: "/admin/auth/domain_login"
}

/**
 * Login 登录服务
 */
class Login {

    getSystemLoginUrl() :string {
        return getUrlConfig().proxyUrl + authUrl.systemLogin
    }

    /**
     * 系统登录
     */
    systemLogin(loginInfo :{account_name: string, password: string, verify_code: string}) :Promise<LoginResponseType> {
        return httpRequest.post<LoginResponseType>(this.getSystemLoginUrl(), {}, loginInfo)
    }

    /**
     * 域账号登录
     */
    domainLogin() {

    }

}

const LoginService = new Login()
export default LoginService