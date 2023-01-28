import httpRequest from "./http";
import Base from "./Base";
import { LogKeywords } from "../store/types/logType";

const logUrl = {
    list: "/admin/log/list",
}

/**
 * Log 日志服务
 */
class Log extends Base {

    public constructor() {
        super();
    }

    /**
     * logList 日志列表
     */
    public logList(pageSize: number | undefined, pageNum: number | undefined, keywords: LogKeywords): Promise<any> {
        const logListUrl = this.getProxyUrl(logUrl.list)
        return httpRequest.get<any>(logListUrl, {
            page_size: pageSize,
            page_num: pageNum,
            keywords: JSON.stringify(keywords),
        })
    }
}

export const LogService = new Log()