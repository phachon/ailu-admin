/**
 * BaseResponse 后台接口返回公共结构
 */
export interface BaseResponse<T> {
    code: number; // code 错误码
    data: T;      // data 成功数据
    message: string; // message 错误信息
}
