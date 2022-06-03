import {ProfileInfoType} from "./types/profileType";
import LocalStorage from "../utils/LocalStorage";

// LocalProfileInfoKey 本地存储的 key
export const LocalProfileInfoKey = "AL_ADMIN_PROFILE_INFO"

// setLocalProfileInfo 存储 profile info
export const setLocalProfileInfo = (profileInfo :ProfileInfoType) => {
    LocalStorage.setValue(LocalProfileInfoKey, profileInfo)
}

// getLocalProfileInfo 获取 profile info
export const getLocalProfileInfo = (): ProfileInfoType|null => {
    return LocalStorage.getValue<ProfileInfoType>(LocalProfileInfoKey)
}

// removeLocalProfileInfo 清除个人资料
export const removeLocalProfileInfo = (): void => {
    LocalStorage.removeValue(LocalProfileInfoKey)
}

