import React, {Component, RefObject} from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AdminState, RoleState} from "../../../store/states/adminState";
import {
    RoleDeleteAction,
    RoleEditFinishAction,
    RoleListChangeAction,
    RoleSearchChangeAction,
    RoleSearchResetAction
} from "../../../store/actions/roleAction";
import {RoleInfoType, RoleListType} from "../../../store/types/roleType";
import {RoleService} from "../../../services/Role";
import {message, Modal, TablePaginationConfig} from "antd";
import RoleListUI from "../component/ListUI";
import RoleSearchUI from "../component/SearchUI";
import RoleFormUI from "../component/FormUI";
import {EditLayoutForm} from "../../../config/layout";

class RoleList extends Component<any, any> {

    searchFormRef: RefObject<any>
    editFormRef: RefObject<any>

    constructor(props: any) {
        super(props);
        this.searchFormRef = React.createRef()
        this.editFormRef = React.createRef()
        this.state = {
            listLoading: false,
            editModalVisible: false,
        }
    }

    /**
     * 列表数据初始化
     */
    componentDidMount() {
        const {pagination} = this.props
        this.searchReset()
        this.getRoleList(pagination, {})
    }

    /**
     * 列表分页处理
     * @param pageConfig
     * @param filters
     * @param sorter
     */
    listChange = (pageConfig: TablePaginationConfig, filters: any, sorter: any) => {
        const { searchKeyWords } = this.props;
        this.getRoleList(pageConfig, searchKeyWords)
    }

    /**
     * 修改点击
     * @param roleInfo
     */
    editClick = (roleInfo: RoleInfoType) => {
        this.setState({
            editModalVisible: true
        }, () => {
            this.editFormRef.current.setFieldsValue(roleInfo)
        })
    }

    /**
     * 修改弹框取消
     */
    editModalCancel = () => {
        this.setState({
            editModalVisible: false
        })
    }

    /**
     * 修改保存
     * @param roleInfo
     */
    editFinish = (roleInfo: RoleInfoType) => {
        RoleService.roleUpdate(roleInfo.role_id, roleInfo.name).then(() => {
            message.success("修改成功", 2, () => {
                this.props.editFinishDispatch(roleInfo)
                this.setState({
                    editModalVisible: false
                })
            })
        }).catch(() => {
            message.error("修改失败", 2)
        })
    }

    /**
     * 确认删除
     * @param roleInfo
     */
    deleteConfirm = (roleInfo: RoleInfoType) => {
        RoleService.roleDelete(roleInfo.role_id).then(() => {
            message.success("删除成功", 2, () => {
                this.props.deleteFinishDispatch(roleInfo)
            })
        }).catch(() => {
            message.error("修改失败", 2)
        })
    }

    /**
     * 搜索查询
     * @param values
     */
    searchChange = (values: any) => {
        this.props.searchChangeDispatch(values)
        const { pagination } = this.props;
        pagination.current = 1
        this.getRoleList(pagination, values)
    }

    /**
     * 搜索重置
     */
    searchReset = () => {
        this.props.searchResetDispatch({})
        this.searchFormRef.current?.resetFields()
    }

    /**
     * 获取角色列表
     * @param pagination
     * @param searchKeyWords
     */
    getRoleList(pagination: TablePaginationConfig, searchKeyWords: {}) {
        const pageSize = pagination.pageSize
        const current = pagination.current
        RoleService.roleList(pageSize, current, searchKeyWords).then((roleList: RoleListType) => {
            this.props.listChangeDispatch(roleList)
        })
    }

    render() {
        return (
            <div className="panel">
                <RoleSearchUI
                    searchForm={this.searchFormRef}
                    searchChangeCallback={this.searchChange}
                    searchResetCallback={this.searchReset}
                />
                <RoleListUI
                    listLoading={false}
                    pagination={this.props.pagination}
                    roleList={this.props.roleList}
                    listChangeCallback={this.listChange}
                    editClickCallback={this.editClick}
                    deleteCallback={this.deleteConfirm}
                />
                <Modal
                    title="角色修改"
                    width={570}
                    visible={this.state.editModalVisible}
                    onCancel={this.editModalCancel}
                    footer={null}
                >
                    <RoleFormUI
                        formRef={this.editFormRef}
                        formLayout={EditLayoutForm}
                        onFinish={this.editFinish}
                    />
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        listChangeDispatch: (data: RoleListType) => RoleListChangeAction(dispatch, data),
        searchResetDispatch: (data: any) => RoleSearchResetAction(dispatch, data),
        searchChangeDispatch: (data: any) => RoleSearchChangeAction(dispatch, data),
        editFinishDispatch: (data: RoleInfoType) => RoleEditFinishAction(dispatch, data),
        deleteFinishDispatch: (data: RoleInfoType) => RoleDeleteAction(dispatch, data),
    }
}

const mapStateToProps = (state: AdminState): RoleState => {
    return {
        ...state.roleState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleList);
