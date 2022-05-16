
/**
 * account info 返回结构
 */
export type AccountInfoResp = {
    account_id: bigint, // 账号ID
    name: string, // 账号名
    given_name: string, // 昵称
    email: string, // 邮箱
    phone: string, // 电话
    mobile: string, // 手机号码
    status: number, // 状态
    create_time: string, // 创建时间
    update_time: string, // 修改时间
}

/**
 * AccountUpdateReq 更新账号信息
 */
export type AccountUpdateReq = {
    given_name: string, // 昵称
    email: string, // 邮箱
    phone: string, // 电话
    mobile: string, // 手机号码
}

/**
 * AccountUpdatePassReq 更新密码
 */
export type AccountUpdatePassReq = {
    old_pwd: string, // 旧密码
    new_pwd: string, // 新密码
    confirm_pwd: string, // 确认密码
}

/**
 * AccountUpdateAddReq 添加账号
 */
export type AccountUpdateAddReq = {
    name: string, // 账号名
    given_name: string, // 昵称
    email: string, // 邮箱
    phone: string, // 电话
    mobile: string, // 手机号码
}