import Token from "../utils/token";

/**
 * 登录 token
 */
export const loginTokenStore = new Token("AILU_ADMIN_LOGIN_TOKEN", 10 * 60 * 60 * 1000)

/**
 * LoginRequest 登录请求结构
 */
export interface LoginRequest {
    account_name: string // 账号名
    password: string // 密码
    verify_code: string // 验证码
}

/**
 * LoginResponse 登录成功返回结构
 */
export interface LoginResponse {
    login_token: string, // 登录 token
}