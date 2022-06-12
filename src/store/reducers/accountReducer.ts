import {ActionType, AdminAction} from "../actions/adminAction";
import {AccountState, initAdminState} from "../states/adminState";
import {AccountInfoType} from "../types/accountType";

const accountListChange = (accountState: AccountState, action: AdminAction): AccountState => {
    return {
        ...accountState,
        listLoading: false,
        accountList: action.data?.list,
        pagination: {
            ...accountState.pagination,
            current: action.data.page_info?.page_num,
            pageSize: action.data.page_info?.page_size,
            total: action.data.page_info?.total_num,
        }
    }
}

const accountSearchChange = (accountState: AccountState, action: AdminAction): AccountState  => {
    return {
        ...accountState,
        listLoading: false,
        pagination: initAdminState.accountState.pagination, // 每次搜索的时候需要默认的页数
        searchKeyWords: action.data
    }
}

const accountSearchReset = (accountState: AccountState, action: AdminAction): AccountState  => {
    return  {
        ...accountState,
        listLoading: false,
        searchKeyWords: {
            status: ""
        }
    }
}

const accountEditClick = (accountState: AccountState, action: AdminAction): AccountState => {
    return  {
        ...accountState,
        editModalVisible: true,
        editAccountInfo: action.data
    }
}

const accountEditClose = (accountState: AccountState, action: AdminAction): AccountState => {
    return  {
        ...accountState,
        editModalVisible: false,
    }
}

const accountEditFinish = (accountState: AccountState, action: AdminAction): AccountState => {
    if (action.data === undefined || accountState.accountList === undefined) {
        return accountState
    }
    let editAccountId = action.data.account_id
    let editAccountList: AccountInfoType[] = []
    for (let i = 0; i < accountState.accountList.length; i++) {
        if (editAccountId !== accountState.accountList[i].account_id) {
            editAccountList.push(accountState.accountList[i])
            continue
        }
        let editAccountInfo: AccountInfoType = {
            ...accountState.accountList[i],
            email: action.data.email,
            given_name: action.data.given_name,
            mobile: action.data.mobile,
            phone: action.data.phone,
        }
        editAccountList.push(editAccountInfo)
    }
    return {
        ...accountState,
        accountList: editAccountList,
        editModalVisible: false,
    }
}

const accountEditStatus = (accountState: AccountState, action: AdminAction): AccountState => {
    if (action.data === undefined || accountState.accountList === undefined) {
        return accountState
    }
    let editAccountId = action.data.account_id
    let editAccountList: AccountInfoType[] = []
    for (let i = 0; i < accountState.accountList.length; i++) {
        if (editAccountId !== accountState.accountList[i].account_id) {
            editAccountList.push(accountState.accountList[i])
            continue
        }
        let editAccountInfo: AccountInfoType = {
            ...accountState.accountList[i],
            status: action.data.status,
        }
        editAccountList.push(editAccountInfo)
    }
    return {
        ...accountState,
        accountList: editAccountList,
        editModalVisible: false,
    }
}

export const accountReducer = (accountState: AccountState = initAdminState.accountState, action: AdminAction): AccountState => {
    switch (action.type) {
        case ActionType.ACCOUNT_LIST_CHANGE: return accountListChange(accountState, action)
        case ActionType.ACCOUNT_SEARCH_CHANGE: return accountSearchChange(accountState, action)
        case ActionType.ACCOUNT_SEARCH_RESET: return accountSearchReset(accountState, action)
        case ActionType.ACCOUNT_EDIT_CLICK: return accountEditClick(accountState, action)
        case ActionType.ACCOUNT_EDIT_CLOSE: return accountEditClose(accountState, action)
        case ActionType.ACCOUNT_EDIT_FINISH: return accountEditFinish(accountState, action)
        case ActionType.ACCOUNT_EDIT_STATUS: return accountEditStatus(accountState, action)
        default: return accountState
    }
}