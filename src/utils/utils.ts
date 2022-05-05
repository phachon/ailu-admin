/**
 * 获取 uuid
 */
export const getUUId = () => {
    return Number(Math.random().toString().substr(2, 10) + Date.now()).toString(36)
}
