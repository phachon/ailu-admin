import httpRequest from "./http";
import {getUrlConfig} from "../config/url";
import {LoginRequest, LoginResponse} from "../store/login";

const authUrl = {
    systemLogin: "/admin/auth/login",
    domainLogin: "/admin/auth/domain_login"
}

/**
 * LoginService 登录服务
 */
class LoginService {

    getSystemLoginUrl() :string {
        return getUrlConfig().proxyUrl + authUrl.systemLogin
    }

    /**
     * 系统登录
     */
    systemLogin(loginRequest :LoginRequest) :Promise<LoginResponse> {
        return httpRequest.post<LoginResponse>(this.getSystemLoginUrl(), {}, loginRequest)
    }

    /**
     * 域账号登录
     */
    domainLogin() {

    }

}

export default LoginService