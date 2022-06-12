import {ActionType, AdminAction} from "../actions/adminAction";
import {RoleState, initAdminState} from "../states/adminState";
import {RoleInfoType} from "../types/roleType";

const roleListChange = (roleState: RoleState, action: AdminAction): RoleState => {
    return {
        ...roleState,
        listLoading: false,
        roleList: action.data?.list,
        pagination: {
            ...roleState.pagination,
            current: action.data.page_info?.page_num,
            pageSize: action.data.page_info?.page_size,
            total: action.data.page_info?.total_num,
        }
    }
}

const roleSearchChange = (roleState: RoleState, action: AdminAction): RoleState  => {
    return {
        ...roleState,
        listLoading: false,
        pagination: initAdminState.roleState.pagination,
        searchKeyWords: action.data
    }
}

const roleSearchReset = (roleState: RoleState, action: AdminAction): RoleState  => {
    return  {
        ...roleState,
        listLoading: false,
        searchKeyWords: {}
    }
}

const roleEditClick = (roleState: RoleState, action: AdminAction): RoleState => {
    return  {
        ...roleState,
        editModalVisible: true,
        editRoleInfo: action.data
    }
}

const roleEditClose = (roleState: RoleState, action: AdminAction): RoleState => {
    return  {
        ...roleState,
        editModalVisible: false,
    }
}

const roleEditFinish = (roleState: RoleState, action: AdminAction): RoleState => {
    if (action.data === undefined || roleState.roleList === undefined) {
        return roleState
    }
    let editRoleId = action.data.role_id
    let editRoleList: RoleInfoType[] = []
    for (let i = 0; i < roleState.roleList.length; i++) {
        if (editRoleId !== roleState.roleList[i].role_id) {
            editRoleList.push(roleState.roleList[i])
            continue
        }
        let editRoleInfo: RoleInfoType = {
            ...roleState.roleList[i],
            name: action.data.name,
        }
        editRoleList.push(editRoleInfo)
    }
    return {
        ...roleState,
        roleList: editRoleList,
        editModalVisible: false,
    }
}

const roleDelete = (roleState: RoleState, action: AdminAction): RoleState => {
    if (action.data === undefined || roleState.roleList === undefined) {
        return roleState
    }
    let editRoleId = action.data.role_id
    let editRoleList: RoleInfoType[] = []
    for (let i = 0; i < roleState.roleList.length; i++) {
        if (editRoleId !== roleState.roleList[i].role_id) {
            editRoleList.push(roleState.roleList[i])
            continue
        }
        let editRoleInfo: RoleInfoType = {
            ...roleState.roleList[i],
            status: action.data.status,
        }
        editRoleList.push(editRoleInfo)
    }
    return {
        ...roleState,
        roleList: editRoleList,
        editModalVisible: false,
    }
}

export const roleReducer = (roleState: RoleState = initAdminState.roleState, action: AdminAction): RoleState => {
    switch (action.type) {
        case ActionType.ROLE_LIST_CHANGE: return roleListChange(roleState, action)
        case ActionType.ROLE_SEARCH_CHANGE: return roleSearchChange(roleState, action)
        case ActionType.ROLE_SEARCH_RESET: return roleSearchReset(roleState, action)
        case ActionType.ROLE_EDIT_CLICK: return roleEditClick(roleState, action)
        case ActionType.ROLE_EDIT_CLOSE: return roleEditClose(roleState, action)
        case ActionType.ROLE_EDIT_FINISH: return roleEditFinish(roleState, action)
        case ActionType.ROLE_EDIT_DELETE: return roleDelete(roleState, action)
        default: return roleState
    }
}