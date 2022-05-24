/**
 * BaseResponse 后台接口返回公共结构
 */
export interface BaseResponse<T> {
    code: number; // code 错误码
    data: T;      // data 成功数据
    message: string; // message 错误信息
}

/**
 * PageInfoType 列表分页结构
 */
export type PageInfoType = {
    total_num  :bigint  // 数据总条数
    total_page :bigint  // 总页数
    page_size  :bigint  // 每一页条数
    page_num   :bigint  // 当前页码
    has_next   :number  // 是否下一页有数据 1默认是 0 否
}
