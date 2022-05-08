
interface UrlConfig {
    proxyUrl: string
}

const devUrlConfig :UrlConfig = {
    proxyUrl: "/admin-api",
}

const proUrlConfig :UrlConfig = {
    proxyUrl: "/admin-api",
}

/**
 * 获取 urlConfig
 * @constructor
 */
export function getUrlConfig() :UrlConfig {
    if (process.env.NODE_ENV === 'development') {
        return devUrlConfig
    }
    return proUrlConfig
}