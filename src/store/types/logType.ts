import { PageInfoType } from "./baseType"

// LogInfoType 日志信息
export type LogInfoType = {
	log_id:  BigInt // 日志ID
	uri: string // 接口uri
	get: string  // get参数
	post: string // post参数
	message: string  // 信息
	level: number   // 日志级别
	file: string   // 文件
	line: number  // 行数
	ip: string  // IP
	account_id: bigint // 账号ID
	account_name: string  // 账号名
    create_time: string, // 创建时间
}

/**
 * LogListType 日志列表返回结构
 */
 export type LogListType = {
    list: LogInfoType[]
    page_info: PageInfoType
 }

export type LogKeywords = {
	account_id?: number,
	message?: string,
	level?: number
 }